import { useForm, type SubmitHandler, type FieldValues } from "react-hook-form";
import { useNavigate } from "react-router";

type Inputs = {
  name: string;
  email: string;
};

export const Signup = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await fetch("http://localhost:3200/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, name: data.name }),
      });

      const result = await res.json();

      if (result.userId) {
        localStorage.setItem("user_id", result.userId);
        navigate("/todo");
      }
    } catch (error) {
      console.error("Erro na requisição", error);
    }
  };

  return (
    <>
      <h1>sign in</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Name" {...register("name")} />
        <input placeholder="Email" {...register("email", { required: true })} />
        <input type="submit" value="Login" />
      </form>
      <a href="/">Voltar para Home</a>
    </>
  );
};
