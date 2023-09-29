import config from "../config"
import Home from "../components/home"

export async function getServerSideProps() {
  const publicConfig = config()

  return { props: { publicConfig } }
}

export default Home
