import React, { useState, useEffect } from "react";
import Link from "next/link";
import * as Realm from "realm-web";
import {
	ShoppingCartIcon,
	MenuIcon,
	SearchIcon,
} from "@heroicons/react/outline";
import Cart from "./Cart";
import { useRouter } from "next/router";

const Header = () => {
	const router = useRouter();
	const { query } = useRouter();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [autoComplete, setAutoComplete] = useState([]);

	useEffect(() => {
		async function getData() {
			if (searchTerm.length) {
				const REALM_APP_ID = process.env.NEXT_PUBLIC_REALM_APP_ID; // ideally in environment variable
				const app = new Realm.App({ id: REALM_APP_ID });
				const credentials = Realm.Credentials.anonymous();
				try {
					const user = await app.logIn(credentials);
					const searchAutoComplete = await user.functions.searchAutoComplete(
						searchTerm
					);
					setAutoComplete(() => searchAutoComplete);
				} catch (err) {
					console.error(err);
				}
			} else {
				setAutoComplete([]);
			}
		}
		getData();
	}, [searchTerm]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!query.term) {
			router.replace({
				pathname: `search/${searchTerm}`,
			});
			setSearchTerm("");
		} else {
			// console.log(searchTerm);
			// console.log(router.query.term);
			// router.query.term = searchTerm;
			// console.log(router.query.term);
			// const redirect = router.query.term;
			router.push(`${searchTerm}`);
			setSearchTerm("");
		}

		// if (router.pathname.includes("search")) {
		// 	const newPath = `search/${searchTerm}`;
		// 	router.push(newPath, undefined, { shallow: true });
		// } else {
		// 	router.push({
		// 		pathname: `search/${searchTerm}`,
		// 	});
		// 	setSearchTerm("");
		// }
	};
	const handleSelect = (id) => {
		setSearchTerm("");
		router.push(`/products/${id}`);
		// console.log(`${id}`);
	};

	return (
		<>
			<header>
				<div className="container mx-auto px-6 py-3">
					<div className="flex items-center justify-between">
						<Link href="/">
							<div className="w-full text-green-500 text-2xl font-semibold cursor-pointer">
								MongoStore
							</div>
						</Link>
						<div className="flex items-center justify-end w-full">
							<button className="text-gray-600 focus:outline-none mx-4 sm:mx-0">
								<ShoppingCartIcon
									onClick={() => setIsCartOpen(!isCartOpen)}
									className="h-5 w-5"
								/>
							</button>

							<div className="flex sm:hidden">
								<button
									onClick={() => setIsMenuOpen(!isMenuOpen)}
									type="button"
									className="text-gray-600 hover:text-gray-500 focus:outline-none focus:text-gray-500"
									aria-label="toggle menu"
								>
									<MenuIcon className="h-5 w-5" />
								</button>
							</div>
						</div>
					</div>

					<nav
						className={`${
							isMenuOpen ? "" : "hidden"
						} sm:flex sm:justify-center sm:items-center mt-4`}
					>
						<div className="flex flex-col sm:flex-row">
							<div className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0">
								<Link href="/">Home</Link>
							</div>
							<div className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0">
								<Link href="/products">Shop</Link>
							</div>
							<a
								className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0"
								href="#"
							>
								Categories
							</a>
							<a
								className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0"
								href="#"
							>
								Contact
							</a>
							<a
								className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0"
								href="#"
							>
								About
							</a>
						</div>
					</nav>

					<div className="relative mt-6 max-w-lg mx-auto">
						<span className="absolute inset-y-0 left-0 pl-3 flex items-center">
							<SearchIcon className="h-5 w-5" />
						</span>
						<form onSubmit={handleSubmit}>
							<input
								className="w-full border rounded-md pl-10 pr-4 py-2 focus:border-green-500 focus:outline-none focus:shadow-outline"
								type="text"
								placeholder="Search"
								onChange={(e) => setSearchTerm(e.target.value)}
								value={searchTerm}
							/>
						</form>
						{autoComplete.length > 0 && (
							<ul className="absolute inset-x-0 top-full bg-green-200 border border-green-500 rounded-md z-20">
								{autoComplete.map((item) => {
									return (
										<li
											key={item._id}
											className="px-4 py-2 hover:bg-green-300 cursor-pointer"
											onClick={() => handleSelect(item._id)}
										>
											{item.name}
										</li>
									);
								})}
							</ul>
						)}
					</div>
				</div>
			</header>
			<Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
		</>
	);
};

export default Header;
