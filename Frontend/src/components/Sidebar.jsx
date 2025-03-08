import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-gray-900 text-white w-64 h-screen p-4 fixed">
      <h2 className="text-xl font-bold mb-4">Menu</h2>
      <ul>
        <li className="mb-2"><Link to="/" className="hover:text-blue-400">Dashboard</Link></li>
        <li className="mb-2"><Link to="/students" className="hover:text-blue-400">Students</Link></li>
        <li className="mb-2"><Link to="/attendance" className="hover:text-blue-400">Attendance</Link></li>
        <li className="mb-2"><Link to="/courses" className="hover:text-blue-400">Courses</Link></li>
        <li className="mb-2"><Link to="/skills" className="hover:text-blue-400">Skills</Link></li>
        <li className="mb-2"><Link to="/academic" className="hover:text-blue-400">Academic</Link></li>
        <li className="mb-2"><Link to="/extracurricular" className="hover:text-blue-400">Extracurricular</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
