export default function Footer() {
  return (
    <footer className="bg-gray-100 py-10 mt-10 flex flex-col items-center gap-5">
      <ul className="font-bold text-lg flex flex-col items-center lg:flex-row gap-x-8 gap-y-3">
        <li className="mf-link text-gray-900 ">Conditions of Use</li>
        <li className="mf-link text-gray-900 ">Privacy & Policy</li>
        <li className="mf-link text-gray-900 ">Press Room</li>
      </ul>
      <p className="font-bold text-gray-500">
        ©{new Date().getFullYear()} MovieFriends by Phan{" "}
      </p>
    </footer>
  );
}
