import { useForm, type SubmitHandler, type FieldValues } from "react-hook-form";
import { useNavigate } from "react-router";
import { login } from "../services/api";

type Inputs = {
  name: string;
  email: string;
};

export const Login = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (email: string) => {
    const result = await login(email);
    
    try {
      localStorage.setItem("user_id", result.userId);
      navigate("/todo");
    } catch (error) {
      console.error("Erro na requisição", error);
      if (result.status === 404) navigate("/signup");
    }  
  }; 

  return (
    <>
      <h1>Formulário</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Name" {...register("name")} />
        <input placeholder="Email" {...register("email", { required: true })} />
        <input type="submit" value="Login" />
      </form>
      <a href="/">Voltar para Home</a>
    </>
  );
};


