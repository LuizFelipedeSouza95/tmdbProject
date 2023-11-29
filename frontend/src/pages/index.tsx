import { useContext, FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import Head from "next/head";
import styles from '../../styles/Home.module.scss';
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/Button";
import { AuthContext } from '../context/AuthContext';
import Link from 'next/link';
import { canSSRGuest } from '../utils/canSSRGuest';

export default function Home() {
  const { signIn } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if (email === '' || password === '') {
      toast.error('Preencha todos os campos!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }

    setLoading(true)

    let data = {
      email,
      password
    }

    signIn(data)

    setLoading(false)

  }

  return (
    <>
      <Head>
        <title>Faça seu login</title>
      </Head>

      <div className={styles.containerCenter}>
        <div className={styles.login}>

          <form onSubmit={handleLogin}>

            <Input
              placeholder="Digite seu email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              placeholder="Sua senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              loading={loading}
            >
              Acessar
            </Button>

          </form>

          <Link href="/signup">
            <p className={styles.text}>Não possui uma conta? Cadastre-se</p>
          </Link>

        </div>

      </div>
    </>
  )
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {}
  }
})