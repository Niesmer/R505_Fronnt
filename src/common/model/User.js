import { makeAutoObservable } from 'mobx';

class User {
  _id;
  _name;
  _email;
  _pseudo;
  _avatar;

  constructor(data) {
    if (data) {
      this.fromJson(data);
    }
    makeAutoObservable(this);
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get email() {
    return this._email;
  }

  get pseudo() {
    return this._pseudo;
  }

  get avatar() {
    return this._avatar;
  }

  set name(name) {
    this._name = name;
  }

  set email(email) {
    this._email = email;
  }

  set pseudo(pseudo) {
    this._pseudo = pseudo;
  }

  set avatar(avatar) {
    this._avatar = avatar;
  }

  fromJson(data) {
    this._email = data.email ?? this._email;
    this._pseudo = data.pseudo ?? this._pseudo;
    this._avatar = data.avatar ?? this._avatar;
    this._name = data.name ?? this._name;
    this._id = data.id ?? this._id;
  }
}

export default User;
