import { useState , useEffect } from "react";
import "./app.css";
import FormInput from "./components/FormInput";
import {client} from "./client"

const App = () => {
   const [submit, setSubmit] = useState(true)
   const [regusers,setRegusers]=useState([])
   const [sorter, setSorter] = useState([])
   const [sorting, setSorting] = useState(false);

   
  const [values, setValues] = useState({
    First_Name: "",
    Last_Name: "",
    email: "",
    birthday: "",
    phone: "",
    address:"",
  });

  const inputs = [
    {
      id: 0,
      name: "First_Name",
      type: "text",
      placeholder: "First Name",
      errorMessage:
        "First Name should be 3-16 characters and shouldn't include any special character!",
      label: "First Name",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 1,
      name: "Last_Name",
      type: "text",
      placeholder: "Last Name",
      errorMessage:
        "Last Name should be 1-16 characters and shouldn't include any special character!",
      label: "Last Name",
      pattern: "^[A-Za-z0-9]{1,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "birthday",
      type: "date",
      placeholder: "Birthday",
      label: "Birthday",
      required: true,
    },
    {
      id: 4,
      name: "phone",
      type: "text",
      placeholder: "0000000000",
      errorMessage: "It should be a valid 10 digit mobile number",
      label: "Phone Number",
      pattern: "^[0-9]{10}$",
      required: true,
    },
    {
      id: 5,
      name: "address",
      type: "text",
      placeholder: "Address",
      errorMessage: "It should valid Address",
      label: "Address",
      pattern: "{3,200}$",
      required: true,
    },
  ];

  const deletePin = (id,index) => {
    delete regusers[index];

    client.delete(id).then(() => {
    });
    setSorter(regusers)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values)

    const users = {
      _type: "users",
     firstname:values.First_Name,
     lastname:values.Last_Name,
     email:values.email,
     phonenumber:values.phone,
     dob:values.birthday,
     address:values.address
    };

    client
      .create(users)
      .then(() => {
       console.log("succesfully sent to backend");
       setSubmit(false);
       setInterval(window.location.reload(), 10000);

      })
      .catch((err) =>{ console.log(err)});


  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const query = '*[_type == "users"]';

    client.fetch(query).then((data) => {
      setRegusers(data);
    });
  }, []);


  const AscName = [...regusers].sort((a, b) =>
    a.firstname.localeCompare(b.firstname)
  );

  const AscLName = [...regusers].sort((a, b) =>
    a.lastname.localeCompare(b.lastname)
  );

  const AscPNum = [...regusers].sort((a, b) =>
    a.phonenumber.localeCompare(b.phonenumber)
  );

  const AscDob = [...regusers].sort((a, b) =>
    a.dob.localeCompare(b.dob)
  );

  const AscAdd= [...regusers].sort((a, b) =>
    a.address.localeCompare(b.address)
  );

  const AscEmail = [...regusers].sort((a, b) =>
    a.email.localeCompare(b.email)
  );



  return (
    <>
      <div className="app">
        <form onSubmit={handleSubmit}>
          {submit ? (
            <>
              <h2>Register</h2>
              {inputs.map((input) => (
                <FormInput
                  key={input.id}
                  {...input}
                  value={values[input.name]}
                  onChange={onChange}
                />
              ))}
              <button>Submit</button>
            </>
          ) : (
            <>
              {" "}
              <h2>User Registerd Succesfully</h2>
            </>
          )}
        </form>
      </div>
      <div className="table_container">
        <h2>Registered Users</h2>
        <div className="table_body">
          <table border="1">
            <tr>
              <th>
                <span
                  onClick={() => {
                    setSorter(AscName);
                    setSorting(true);
                  }}
                >
                  First Name
                </span>
              </th>
              <th>
                <span
                  onClick={() => {
                    setSorter(AscLName);
                    setSorting(true);
                  }}
                >
                  Last Name
                </span>
              </th>
              <th>
                <span
                  onClick={() => {
                    setSorter(AscEmail);
                    setSorting(true);
                  }}
                >
                  Email
                </span>
              </th>
              <th>
                <span
                  onClick={() => {
                    setSorter(AscPNum);
                    setSorting(true);
                  }}
                >
                  Phone NUmber
                </span>
              </th>
              <th>
                <span
                  onClick={() => {
                    setSorter(AscDob);
                    setSorting(true);
                  }}
                >
                  Date of birth
                </span>
              </th>
              <th>
                <span
                  onClick={() => {
                    setSorter(AscAdd);
                    setSorting(true);
                  }}
                >
                  Address
                </span>
              </th>
            </tr>
            {sorting
              ? sorter.map((users, index) => (
                  <tr key={index}>
                    <td>
                      <span>{users.firstname}</span>
                    </td>
                    <td>
                      <span>{users.lastname}</span>
                    </td>
                    <td>
                      <span>{users.email}</span>
                    </td>
                    <td>
                      <span>{users.phonenumber}</span>
                    </td>
                    <td>
                      <span>{users.dob}</span>
                    </td>
                    <td>
                      <span>{users.address}</span>
                    </td>
                    <td>
                      <span
                        className="delete"
                        onClick={(e) => {
                          e.stopPropagation();
                          deletePin(users._id, index);
                        }}
                      >
                        Delete User
                      </span>
                    </td>
                  </tr>
                ))
              : regusers.map((users, index) => (
                  <tr key={index}>
                    <td>
                      <span>{users.firstname}</span>
                    </td>
                    <td>
                      <span>{users.lastname}</span>
                    </td>
                    <td>
                      <span>{users.email}</span>
                    </td>
                    <td>
                      <span>{users.phonenumber}</span>
                    </td>
                    <td>
                      <span>{users.dob}</span>
                    </td>
                    <td>
                      <span>{users.address}</span>
                    </td>
                    <td>
                      <span
                        className="delete"
                        onClick={(e) => {
                          e.stopPropagation();
                          deletePin(users._id, index);
                        }}
                      >
                        Delete User
                      </span>
                    </td>
                  </tr>
                ))}
          </table>
        </div>
      </div>
    </>
  );
};

export default App;
