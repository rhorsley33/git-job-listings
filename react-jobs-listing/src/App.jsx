import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import HomePage from "./pages/HomePage"
import JobsPage from "./pages/JobsPage"
import NotFound from "./pages/NotFound"
import JobPage, { jobLoader } from "./pages/JobPage"
import AddJobPage from "./pages/AddJobPage"
import EditJobPage from "./pages/EditJobPage"

const App = () => {
    const addJob =  async (newJob) => {
        const res = await fetch('/api/jobs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newJob)
        })
    }

    const deleteJob = async (id) => {
        const res = await fetch(`/api/jobs/${id}`, {
            method: 'DELETE',
        })
    }

    const editJob = async (job) => {
        const res = await fetch(`/api/jobs/${job.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(job)
        })
    }

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="/jobs" element={<JobsPage />} />
                <Route path="/jobs/:id" element={<JobPage deleteJob={deleteJob} />} loader={jobLoader} />
                <Route path="edit-job/:id" element={<EditJobPage updateJob={editJob}/>} loader={jobLoader} />
                <Route path="/add-job" element={<AddJobPage  addJobSubmit={addJob}/>} />
                <Route path="*" element={<NotFound />} />
            </Route>
        )
    )

    return (
        <RouterProvider router={router} />
    )
}
export default App
