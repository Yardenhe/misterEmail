import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"

export function Compose({ user }) {
  return (
    <Link to={`/email/compose`}>
      <section className="email-compose">
        <FontAwesomeIcon icon={faPencilAlt} className="pencil-icon" />
        <h1>Compose</h1>
      </section>
    </Link>
  )
}
