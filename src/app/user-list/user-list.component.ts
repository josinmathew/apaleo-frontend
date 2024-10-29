import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { User } from './interfaces/user';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [MatTableModule, MatSortModule, MatFormFieldModule, MatInputModule, MatPaginatorModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  @ViewChild(MatSort)
  sort: MatSort = new MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  users: User[] = [];
  filteredUsers: User[] = [];

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'age', 'fullAddress'];
  dataSource!: MatTableDataSource<User>;

  constructor(private userService: UserService) {

  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(response => {
      this.users = response.users.map((user: any) => ({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age,
        fullAddress: `${user.address.address}, ${user.address.city}, ${user.address.postalCode}`
      }));
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
