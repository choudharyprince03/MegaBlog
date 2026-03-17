import { Container,PostForm, AuthLayout } from "../components"

const AddPosts = () => {
  return (
    <AuthLayout requiredAuth={true}>
      <div className="py-8">
        <Container> 
             <PostForm />
        </Container>
      </div>
    </AuthLayout>
  )
}

export default AddPosts