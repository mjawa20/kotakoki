<script>
	import { postUser } from '../store/user';
	import { clearData } from '../utils';
	let user = {
		name: '',
		surName: '',
		email: '',
		password: ''
	};

	const handlePost = async () => {
		await postUser(user);
		clearData(user);
		alert('berhasil register')
	};
</script>

<div class="w-full md:w-1/2 flex flex-col">
	<h1 class="font-bold text-2xl text-amber-900 my-10">Create an account</h1>
	<input
		type="text"
		class="border p-2 mb-4 placeholder:text-gray-700 placeholder:text-sm"
		placeholder="Name"
		bind:value={user.name}
	/>
	<input
		type="text"
		class="border p-2 mb-4 placeholder:text-gray-700 placeholder:text-sm"
		placeholder="Surname"
		bind:value={user.surname}
	/>
	<input
		type="text"
		class="border p-2 mb-4 placeholder:text-gray-700 placeholder:text-sm"
		placeholder="Email address"
		bind:value={user.email}
	/>
	<input
		type="password"
		class="border p-2 mb-4 placeholder:text-gray-700 placeholder:text-sm"
		placeholder="Password"
		bind:value={user.password}
	/>
	<button
		class="mb-4 p-3 rounded-sm bg-amber-900 text-white w-fit font-semibold text-sm"
		on:click={handlePost}>create</button
	>
	<a href="/" class=" rounded-sm  text-amber-900 w-fit font-semibold text-sm ">Return the store</a>
</div>
