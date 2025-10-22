export class UserBuilder {
  private user: any = {};

  static create(): UserBuilder {
    return new UserBuilder()
      .withId('test-id')
      .withEmail('test@example.com')
      .withPassword('hashed-password')
      .withFirstName('Test')
      .withLastName('User')
      .withActive(true)
      .withFavoriteBreeds([]);
  }

  withId(id: string): UserBuilder {
    this.user.id = id;
    return this;
  }

  withEmail(email: string): UserBuilder {
    this.user.email = email;
    return this;
  }

  withPassword(password: string): UserBuilder {
    this.user.password = password;
    return this;
  }

  withFirstName(firstName: string): UserBuilder {
    this.user.firstName = firstName;
    return this;
  }

  withLastName(lastName: string): UserBuilder {
    this.user.lastName = lastName;
    return this;
  }

  withActive(isActive: boolean): UserBuilder {
    this.user.isActive = isActive;
    return this;
  }

  withFavoriteBreeds(breeds: string[]): UserBuilder {
    this.user.favoriteBreeds = breeds;
    return this;
  }

  build(): any {
    return this.user;
  }
}

export class CreateUserDtoBuilder {
  private dto: any = {};

  static create(): CreateUserDtoBuilder {
    return new CreateUserDtoBuilder()
      .withEmail('test@example.com')
      .withPassword('password123')
      .withFirstName('Test')
      .withLastName('User');
  }

  withEmail(email: string): CreateUserDtoBuilder {
    this.dto.email = email;
    return this;
  }

  withPassword(password: string): CreateUserDtoBuilder {
    this.dto.password = password;
    return this;
  }

  withFirstName(firstName: string): CreateUserDtoBuilder {
    this.dto.firstName = firstName;
    return this;
  }

  withLastName(lastName: string): CreateUserDtoBuilder {
    this.dto.lastName = lastName;
    return this;
  }

  build(): any {
    return this.dto;
  }
}

export class LoginDtoBuilder {
  private dto: any = {};

  static create(): LoginDtoBuilder {
    return new LoginDtoBuilder()
      .withEmail('test@example.com')
      .withPassword('password123');
  }

  withEmail(email: string): LoginDtoBuilder {
    this.dto.email = email;
    return this;
  }

  withPassword(password: string): LoginDtoBuilder {
    this.dto.password = password;
    return this;
  }

  build(): any {
    return this.dto;
  }
}