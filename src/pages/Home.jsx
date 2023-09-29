import imgUrl from "../assets/imgs/gmail-logo.png"
import { AppHeader } from "../cmps/AppHeader";

export function Home() {
  return (
    <section className="home">
      <h1>Welcome to Gmail</h1>
      <img src={imgUrl} alt="" />
      <AppHeader />
    </section>
  )
}
