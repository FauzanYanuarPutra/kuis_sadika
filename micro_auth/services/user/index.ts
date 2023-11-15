// userService.ts
import * as grpc from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";

const PROTO_PATH = "../user/user.proto";
const packageDefinition = loadSync(PROTO_PATH);
export const userProto: any = grpc.loadPackageDefinition(packageDefinition).user;

interface IUser {
  id?: string;
  username: string;
  email: string;
  avatar: string;
}

export type CreateUserResponse = {
  success: boolean;
  message: string;
};


export const userService = {
  UserRepository: AppDataSource.getRepository(User),

  GetUser: async (
    call: grpc.ServerUnaryCall<{ id: string }, IUser>, 
    callback: grpc.sendUnaryData<User>
  ) => {
    try {
      const id = Number(call.request.id);
      const user: any = await userService.UserRepository.findOne({
        where: { id },
      });

      if (user) {
        callback(null, user);
      } else {
        callback({
          code: grpc.status.NOT_FOUND,
          details: "User not found",
        });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      callback({
        code: grpc.status.INTERNAL,
        details: "Internal server error",
      });
    }
  },

  CreateUser: async (call: grpc.ServerUnaryCall<IUser, CreateUserResponse>, callback: grpc.sendUnaryData<CreateUserResponse>) => {
    try {

      const email: string = call.request.email;
      const user: any = await userService.UserRepository.findOne({
        where: { email },
      });

      if (!user) {
        const newUser = new User();
        newUser.username = call.request.username;
        newUser.email = call.request.email;
        newUser.avatar = call.request.avatar;
        await userService.UserRepository.save(newUser);
      }

      const response: CreateUserResponse = {
        success: true,
        message: "User created successfully",
      };

      callback(null, response);
    } catch (error) {
      console.error("Error creating user:", error);
      callback({
        code: grpc.status.INTERNAL,
        details: "Internal server error",
      });
    }
  },

};