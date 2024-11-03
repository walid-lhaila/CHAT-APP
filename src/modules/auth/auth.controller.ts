import { Body, Controller, NotFoundException, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/login")
  async login(@Body("email") email: string) {
    const user = await this.authService.findByEmail(email);
    if (!user) {
      throw new NotFoundException("user not found");
    }

    return { message: "User Logged In Successfully", user };
  }
}
