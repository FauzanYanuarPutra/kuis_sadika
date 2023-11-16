package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"time"

	pb "golang_express_grpc/user"

	"google.golang.org/grpc/credentials/insecure"

	"github.com/gofiber/fiber/v2"
	"google.golang.org/grpc"
)

const (
	serverAddr = "localhost:50051"
	httpPort   = ":5000"
)

func grpcToRestHandler(c *fiber.Ctx) error {
	switch c.Method() {
	case fiber.MethodGet:
		return getUserHandler(c)
	case fiber.MethodPost:
		return createUserHandler(c)
	default:
		return c.Status(fiber.StatusMethodNotAllowed).SendString("Method not allowed")
	}
}

func getUserHandler(c *fiber.Ctx) error {
	userID := c.Query("id")
	if userID == "" {
		return c.Status(fiber.StatusBadRequest).SendString("User ID is required")
	}

	conn, err := grpc.Dial(serverAddr, grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(fmt.Sprintf("Could not connect: %v", err))
	}
	defer conn.Close()

	client := pb.NewUserServiceClient(conn)

	req := &pb.UserRequest{Id: userID}

	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()

	user, err := client.GetUser(ctx, req)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(fmt.Sprintf("Error getting user: %v", err))
	}

	response, err := json.Marshal(user)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(fmt.Sprintf("Error marshalling response: %v", err))
	}

	c.Type("application/json").Send(response)
	return nil
}

func createUserHandler(c *fiber.Ctx) error {
	var newUser pb.CreateUserRequest
	if err := c.BodyParser(&newUser); err != nil {
		return c.Status(fiber.StatusBadRequest).SendString(fmt.Sprintf("Error parsing request body: %v", err))
	}

	conn, err := grpc.Dial(serverAddr, grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(fmt.Sprintf("Could not connect: %v", err))
	}
	defer conn.Close()

	client := pb.NewUserServiceClient(conn)

	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()

	response, err := client.CreateUser(ctx, &newUser)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(fmt.Sprintf("Error creating user: %v", err))
	}

	createUserResponse, err := json.Marshal(response)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(fmt.Sprintf("Error marshalling response: %v", err))
	}

	c.Type("application/json").Send(createUserResponse)
	return nil
}

func main() {
	app := fiber.New()

	app.Post("/user", grpcToRestHandler)
	app.Get("/user", grpcToRestHandler)

	fmt.Printf("REST API Server listening on port %s...\n", httpPort)
	log.Fatal(app.Listen(httpPort))
}

