"use client"

import { useParams } from "next/navigation"

function ProjectPage() {
    const {id} = useParams()
  return (
    <div>
        Project: {id}
    </div>
  )
}

export default ProjectPage
