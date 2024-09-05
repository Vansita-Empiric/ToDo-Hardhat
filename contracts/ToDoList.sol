// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ToDoList {
    struct ToDo {
        bytes4 todoId;
        string description;
        bool isCompleted;
    }

    struct User {
        bytes4 userId;
        address userAdd;
        string username;
        bool isRegistered;
    }

    mapping(address => ToDo[]) todos;
    mapping(address => User) users;
    mapping(address => bool) isLoggedIn;
    mapping(string => bool) isUsernameAvailable;

    // ToDo[] todoArr;
    User[] userArr;

    modifier loginOnly() {
        require(isLoggedIn[msg.sender], "You have to login");
        _;
    }

    modifier todoExists(uint _index) {
        require(todos[msg.sender].length > 0, "To Do not found");
        _;
    }

    function registerUser(string memory _username) public {
        require(!users[msg.sender].isRegistered, "You have already registered");
        require(!isUsernameAvailable[_username], "Username is not available");
        bytes4 uid = bytes4(keccak256(abi.encodePacked(block.timestamp)));
        User memory user = User(uid, msg.sender, _username, true);
        userArr.push(user);
        users[msg.sender] = user;
        isUsernameAvailable[_username] = true;
    }

    function loginUser(string memory _username) public {
        require(users[msg.sender].isRegistered, "You have to register first");
        require(!isLoggedIn[msg.sender], "You are already logged in");
        require(
            keccak256(abi.encodePacked(users[msg.sender].username)) ==
                keccak256(abi.encodePacked(_username)),
            "Invalid user"
        );
        isLoggedIn[msg.sender] = true;
    }

    function logoutUser() public loginOnly {
        isLoggedIn[msg.sender] = false;
    }

    function getUsers() public view loginOnly returns (User[] memory) {
        return userArr;
    }

    function createTodo(string memory _description) public loginOnly {
        bytes4 id = bytes4(keccak256(abi.encodePacked(block.timestamp)));

        ToDo memory todo = ToDo(id, _description, false);
        // todoArr.push(todo);
        todos[msg.sender].push(todo);
    }

    function completeTodo(uint _index) public loginOnly todoExists(_index) {
        require(_index < todos[msg.sender].length, "Invalid ToDo index");
        todos[msg.sender][_index].isCompleted = true;
        // for(uint _i=0; _i < todos[msg.sender].length; _i++) {
        //     if(_index == _i) {
        //         todoArr[_i].isCompleted = true;
        //     }
        // }
    }

    function getTodo(
        address _user
    ) public view loginOnly returns (ToDo[] memory) {
        return todos[_user];
    }

    function deleteTodoById(bytes4 _id) public loginOnly {
        ToDo[] storage list = todos[msg.sender];

        for (uint i = 0; i < list.length; i++) {
            if (list[i].todoId == _id) {
                list[i] = list[list.length - 1];
                list.pop();
            }
        }
    }

    function updateTodoById(bytes4 _id, string memory _desc) public loginOnly {
        for (uint i = 0; i < todos[msg.sender].length; i++) {
            if (todos[msg.sender][i].todoId == _id) {
                todos[msg.sender][i].description = _desc;
                // todoArr[i].description = _desc;
            }
        }
    }
}
