import { Component} from '@angular/core';
import { User } from 'src/models/users/user';
import { UserRepository } from 'src/repositories/user.repository';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent  {

  singupUser:User = new User('','', '', '', [], [])
  private users: User[] = [];
  constructor(

    private userRepository: UserRepository
  ) {
    this.userRepository.getUsers().subscribe({
      next: (value) => {
        this.users = value
        console.log(this.users)
      }
    })
  }


  registerUser():void{
    console.log(this.singupUser);
    this.userRepository.sendUser(this.singupUser).subscribe()
  }
}
