import React from "react"
import { AddVocal } from "../Terms/AddVocal"
import styles from "./sidebar.module.css"
import { AiOutlineClose } from "react-icons/ai"

export default function AdminSideBar({ sideBarCheck, setSideBarCheck }) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.absolute_close_icon} onClick={(e) => setSideBarCheck(!sideBarCheck)}>
        <AiOutlineClose />
      </span>
      <AddVocal />
    </div>
  )
}
