import imgUrl from "../assets/imgs/gmail-logo.png";

export function Home() {
  return (
    <section className="home">
      <h1>Welcome to Gmail</h1>
      <img src={imgUrl} alt="" />
    </section>
  );
}
