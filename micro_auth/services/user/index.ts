// userService.ts
import * as grpc from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";

const PROTO_PATH = "../user/user.proto";
const packageDefinition = loadSync(PROTO_PATH);
export const userProto: any = grpc.loadPackageDefinition(packageDefinition).user;

interface User {
  id: string;
  username: string;
  email: string;
  profile_picture: string;
}



export type CreateUserResponse = {
  success: boolean;
  message: string;
};


const userData: User[] = [
  {
    id: "1",
    username: "john_doe",
    email: "john.doe@example.com",
    profile_picture: "url_to_johns_picture",
  },
  {
    id: "2",
    username: "jane_doe",
    email: "jane.doe@example.com",
    profile_picture: "url_to_janes_picture",
  },
  {
    id: "3",
    username: "james_smith",
    email: "james.smith@example.com",
    profile_picture: "url_to_james_picture",
  },
  {
    id: "4",
    username: "emma_johnson",
    email: "emma.johnson@example.com",
    profile_picture: "url_to_emma_picture",
  },
  {
    id: "5",
    username: "alex_smith",
    email: "alex.smith@example.com",
    profile_picture: "url_to_alex_picture",
  },
  {
    id: "6",
    username: "sarah_johnson",
    email: "sarah.johnson@example.com",
    profile_picture: "url_to_sarah_picture",
  },
  {
    id: "7",
    username: "michael_brown",
    email: "michael.brown@example.com",
    profile_picture: "url_to_michael_picture",
  },
  {
    id: "8",
    username: "emily_davis",
    email: "emily.davis@example.com",
    profile_picture: "url_to_emily_picture",
  },
  {
    id: "9",
    username: "william_smith",
    email: "william.smith@example.com",
    profile_picture: "url_to_william_picture",
  },
  {
    id: "10",
    username: "olivia_johnson",
    email: "olivia.johnson@example.com",
    profile_picture: "url_to_olivia_picture",
  },
  {
    id: "11",
    username: "jacob_brown",
    email: "jacob.brown@example.com",
    profile_picture: "url_to_jacob_picture",
  },
  {
    id: "12",
    username: "ava_davis",
    email: "ava.davis@example.com",
    profile_picture: "url_to_ava_picture",
  },
  {
    id: "13",
    username: "noah_smith",
    email: "noah.smith@example.com",
    profile_picture: "url_to_noah_picture",
  },
  {
    id: "14",
    username: "isabella_johnson",
    email: "isabella.johnson@example.com",
    profile_picture: "url_to_isabella_picture",
  },
  {
    id: "15",
    username: "liam_brown",
    email: "liam.brown@example.com",
    profile_picture: "url_to_liam_picture",
  },
  {
    id: "16",
    username: "mia_davis",
    email: "mia.davis@example.com",
    profile_picture: "url_to_mia_picture",
  },
  {
    id: "17",
    username: "ethan_smith",
    email: "ethan.smith@example.com",
    profile_picture: "url_to_ethan_picture",
  },
  {
    id: "18",
    username: "ava_johnson",
    email: "ava.johnson@example.com",
    profile_picture: "url_to_ava_picture",
  },
  {
    id: "19",
    username: "logan_brown",
    email: "logan.brown@example.com",
    profile_picture: "url_to_logan_picture",
  },
  {
    id: "20",
    username: "harper_davis",
    email: "harper.davis@example.com",
    profile_picture: "url_to_harper_picture",
  },
  {
    id: "21",
    username: "aiden_smith",
    email: "aiden.smith@example.com",
    profile_picture: "url_to_aiden_picture",
  },
  {
    id: "22",
    username: "abigail_johnson",
    email: "abigail.johnson@example.com",
    profile_picture: "url_to_abigail_picture",
  },
  {
    id: "23",
    username: "carter_brown",
    email: "carter.brown@example.com",
    profile_picture: "url_to_carter_picture",
  },
  {
    id: "24",
    username: "elizabeth_davis",
    email: "elizabeth.davis@example.com",
    profile_picture: "url_to_elizabeth_picture",
  },
  {
    id: "25",
    username: "mason_smith",
    email: "mason.smith@example.com",
    profile_picture: "url_to_mason_picture",
  },
];

export const userService = {
  GetUser: (
    call: grpc.ServerUnaryCall<{ id: string }, User>, 
    callback: grpc.sendUnaryData<User>
  ) => {
    const id = call.request.id;
    const user = userData.find((u) => u.id === id);
    if (user) {
      callback(null, user);
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        details: "User not found",
      });
    }
  },

  CreateUser: (call: grpc.ServerUnaryCall<User, CreateUserResponse>, callback: grpc.sendUnaryData<CreateUserResponse>) => {
    const newUser = {
      id: "3",
      username: call.request.username,
      email: call.request.email,
      profile_picture: call.request.profile_picture,
    };

    userData.push(newUser);

    const response: CreateUserResponse = {
      success: true,
      message: "User created successfully",
    };

    callback(null, response);
  },

};


