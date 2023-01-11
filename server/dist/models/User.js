export class User {
    constructor(_id, firstName, lastName, email, phone, gender, password, role = 1 /* UserRole.Client */, about, imgUrl) {
        this._id = _id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.gender = gender;
        this.password = password;
        this.role = role;
        this.about = about;
        this.imgUrl = imgUrl;
    }
}
export class UserDTO {
    constructor(_id, firstName, lastName, email, phone, gender, role, about, imgUrl) {
        this._id = _id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.gender = gender;
        this.role = role;
        this.about = about;
        this.imgUrl = imgUrl;
    }
}
//# sourceMappingURL=User.js.map