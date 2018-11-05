import { UsuarioDTO } from './../../models/domain/usuario.dto';
import { Injectable } from '@angular/core';

import { LocalUserDTO } from './../../models/localuser.dto';
import { STORAGE_KEYS } from 'src/config/storage.config';

@Injectable({
providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getLocalUser(): LocalUserDTO {
    const usr = localStorage.getItem(STORAGE_KEYS.localUser);
    if (usr == null) {
      return null;
    } else {
      return JSON.parse(usr);
    }
  }

  setLocalUser(obj: LocalUserDTO) {
    if (obj == null) {
      localStorage.removeItem(STORAGE_KEYS.localUser);
    } else {
      localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
    }
  }

  getUser(): UsuarioDTO {
    const user = localStorage.getItem(STORAGE_KEYS.user);
    if (user == null) {
      return null;
    } else {
      return JSON.parse(user);
    }
  }

  setUser(obj: UsuarioDTO) {
    if (obj == null) {
      localStorage.removeItem(STORAGE_KEYS.user);
    } else {
      localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(obj));
    }
  }
}
