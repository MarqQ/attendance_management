import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentList: [],
      activeItem: {
        id: null,
        name: '',
        status: false,
      },
      editing: false,
    };
    this.fetchStudents = this.fetchStudents.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getCookie = this.getCookie.bind(this);
    this.startEdit = this.startEdit.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.studentsPresence = this.studentsPresence.bind(this);
  }

  getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === name + '=') {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  componentWillMount() {
    this.fetchStudents();
  }

  fetchStudents() {
    console.log('Carregando...');

    fetch(`http://127.0.0.1:8000/api/student-list/`)
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          studentList: data,
        }),
      );
  }

  handleChange(e) {
    var name = e.target.name;
    var value = e.target.value;
    console.log('Name:', name);
    console.log('Value:', value);

    this.setState({
      activeItem: {
        ...this.state.activeItem,
        name: value,
      },
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('ITEM:', this.state.activeItem);

    var csrftoken = this.getCookie('csrftoken');

    var url = `http://127.0.0.1:8000/api/student-create/`;

    if (this.state.editing === true) {
      url = `http://127.0.0.1:8000/api/student-update/${this.state.activeItem.id}/`;
      this.setState({
        editing: false,
      });
    }

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      body: JSON.stringify(this.state.activeItem),
    })
      .then((response) => {
        this.fetchStudents();
        this.setState({
          activeItem: {
            id: null,
            name: '',
            status: false,
          },
        });
      })
      .catch(function (error) {
        console.log('ERROR', error);
      });
  }

  startEdit(student) {
    this.setState({
      activeItem: student,
      editing: true,
    });
  }

  deleteItem(student) {
    var csrftoken = this.getCookie('csrftoken');

    fetch(`http://127.0.0.1:8000/api/student-delete/${student.id}/`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
    }).then((response) => {
      this.fetchStudents();
    });
  }

  studentsPresence(student) {
    student.status = !student.status;
    var csrftoken = this.getCookie('csrftoken');
    var url = `http://127.0.0.1:8000/api/student-update/${student.id}/`;

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      body: JSON.stringify({ status: student.status, name: student.name }),
    }).then(() => {
      this.fetchStudents();
    });

    console.log('TASK:', student.status);
  }

  render() {
    var students = this.state.studentList;
    var self = this;
    return (
      <div className="container">
        <div id="list-container">
          <div id="form-wrapper">
            <form onSubmit={this.handleSubmit} id="form">
              <div className="flex-wrapper">
                <div style={{ flex: 6 }}>
                  <input
                    onChange={this.handleChange}
                    className="form-control"
                    id="name"
                    value={this.state.activeItem.name}
                    type="text"
                    name="name"
                    placeholder="Cadastrar Aluno"
                  ></input>
                </div>
                <div style={{ flex: 1 }}>
                  <input
                    id="submit"
                    className="btn btn-warning"
                    type="submit"
                    name="Adicionar"
                    value="Adicionar"
                  ></input>
                </div>
              </div>
            </form>
          </div>
          <div id="list-wrapper">
            {students.map(function (students, index) {
              return (
                <div key={index} className="list-wrapper flex-wrapper">
                  <div
                    onClick={() => self.studentsPresence(students)}
                    style={{ flex: 7 }}
                  >
                    <span>{students.name}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      onClick={() => self.studentsPresence(students)}
                      style={{ flex: 7 }}
                    >
                      {students.status === false ? (
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="defaultCheck1"
                        ></input>
                      ) : (
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="defaultCheck1"
                          checked
                        ></input>
                      )}
                    </div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <button
                      onClick={() => self.startEdit(students)}
                      className="btn btn-sm btn-outline-info"
                    >
                      Editar
                    </button>
                  </div>
                  <div style={{ flex: 1 }}>
                    <button
                      onClick={() => self.deleteItem(students)}
                      className="btn btn-sm btn-outline-dark delete"
                    >
                      {' '}
                      Deletar
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
