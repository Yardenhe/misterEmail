
import imgUrl from "../assets/imgs/gmail-logo.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from '@fortawesome/free-solid-svg-icons'

export function Logo({ setOpenMenu }) {
    return (
        <section className="logo" onClick={() => { setOpenMenu((menu) => !menu) }}>


            <FontAwesomeIcon className="menu-icon" icon={faBars} />
            <img className="img-logo" src={imgUrl} alt="" />
            <h2>Gmail</h2>
        </section>
    )
}
