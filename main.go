package main

import (
	"context"
	"fmt"
	"log"
	"time"

	pb "golang_express_grpc/user"

	"google.golang.org/grpc"
)

func main() {
	serverAddr := "localhost:50051"

	conn, err := grpc.Dial(serverAddr, grpc.WithInsecure())
	if err != nil {
		log.Fatalf("Could not connect: %v", err)
	}
	defer conn.Close()

	client := pb.NewUserServiceClient(conn)

	userID := "1"
	req := &pb.UserRequest{Id: userID}

	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()

	user, err := client.GetUser(ctx, req)
	if err != nil {
		log.Fatalf("Error getting user: %v", err)
	}

	fmt.Printf("User: %+v\n", user)
}
