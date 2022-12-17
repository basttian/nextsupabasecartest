import type { NextPage } from 'next'
import Layout from "../components/Layout"
import { useRouter } from 'next/router'

const Feedback: NextPage = () => {
  const router = useRouter()
  return (
    <>
    <Layout>
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      <h1>Response: </h1>
      <pre>{JSON.stringify(router.query,null,2)}</pre>
    </div>
    </Layout>
    </>
  )
}


export default Feedback
