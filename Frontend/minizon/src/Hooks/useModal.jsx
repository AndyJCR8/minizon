import React from 'react'
import { useState } from 'react'

export default function useModal() {

  const [active, setActive] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  return {
    Active: { "active": active, "setActive": setActive },
    Title: { "title": title, "setTitle": setTitle },
    Message: { "message": message, "setMessage": setMessage }
  }
}
