import classes from "./Login.module.css";

function Login() {
  return (
    <>
      <div className="center-screen">
        <form className={classes.form}>
          <p>
            <label htmlFor="name">username</label>
            <input type="text" id="name" required />
          </p>

          <p>
            <label htmlFor="name">password</label>
            <input type="text" id="name" required />
          </p>

          <p className={classes.actions}>
            <button>Login</button>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
