import config from "../config"
import Account from "../components/account"

export async function getServerSideProps() {
  const publicConfig = config()

  return { props: { publicConfig } }
}

export default Account
