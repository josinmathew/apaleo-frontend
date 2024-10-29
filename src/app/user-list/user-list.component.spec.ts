// user-list.component.spec.ts
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { of } from 'rxjs';

import { UserListComponent } from './user-list.component';
import { UserService } from './services/user.service';
import { User } from './interfaces/user';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let mockUserService: jasmine.SpyObj<UserService>;

  const mockUsers: User[] = [
    {
      id: 1, firstName: 'John', lastName: 'Doe', age: 30, address: {
        address: "547 First Street",
        city: "Fort Worth",
        postalCode: "83843",
      },
    },
    {
      id: 2, firstName: 'Jane', lastName: 'Smith', age: 25, address: {
        address: "547 First Street",
        city: "Fort Worth",
        postalCode: "83843",
      },
    },
  ];

  beforeEach(waitForAsync(() => {
    // Create a mock UserService with jasmine
    mockUserService = jasmine.createSpyObj('UserService', ['getUsers']);
    mockUserService.getUsers.and.returnValue(of({ users: mockUsers }));

    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, UserListComponent],
      providers: [{ provide: UserService, useValue: mockUserService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;

    // Set up mock paginator and sort
    component.paginator = { firstPage: jasmine.createSpy('firstPage') } as any as MatPaginator;
    component.sort = {} as MatSort;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize and fetch users from the service', () => {
    expect(mockUserService.getUsers).toHaveBeenCalled();
    expect(component.users.length).toBe(2);
    const data = mockUsers.map((user: any) => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      age: user.age,
      fullAddress: `${user.address.address}, ${user.address.city}, ${user.address.postalCode}`
    }));
    expect(component.users).toEqual(data);
  });

  it('should filter the dataSource based on input', () => {
    component.applyFilter({ target: { value: 'Jane' } } as any as Event);

    expect(component.dataSource.filter).toBe('jane');
  });
});
