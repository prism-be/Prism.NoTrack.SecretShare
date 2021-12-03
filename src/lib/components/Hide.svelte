<script lang="ts">
	import { Row, Col, Container, Form, FormGroup, Label, Input, Button, InputGroup, InputGroupText } from 'sveltestrap';
	import type { SecretContent, EncryptedContent } from '$lib/types';
	import { secretContentValidation } from '$lib/validations';
	import { addSeconds, format, getUnixTime } from 'date-fns';

	let secret = '';
	let passphrase = '';
	let expirationDuration = 15;
	let expirationType = 'minutes';
	let computedExpiration = '';
	let isSecretInvalid = false;
	let isPasshraseInvalid = false;
	let isExpirationInvalid = false;

	function computeExpiration(): number {
		let seconds = 0;

		switch (expirationType) {
			case 'minutes':
				seconds += expirationDuration * 60;
				break;
			case 'hours':
				seconds += expirationDuration * 60 * 60;
				break;
			case 'days':
				seconds += expirationDuration * 60 * 60 * 24;
				break;
		}

		var date = addSeconds(new Date(), seconds);
		computedExpiration = format(date, 'dd/MM/yyyy HH:mm');
		return getUnixTime(date);
	}

	async function doHide(e: Event) {
		e.preventDefault();

		const secretContent: SecretContent = {
			secret,
			passphrase,
			expiration: computeExpiration()
		};

		isSecretInvalid = isPasshraseInvalid = isExpirationInvalid = false;

		try {
			await secretContentValidation.validate(secretContent);

			const response = await fetch('/api/hide', {
				method: 'POST',
				body: JSON.stringify(secretContent),
				headers: {
					'Content-type': 'application/json; charset=UTF-8'
				}
			});

			var content : EncryptedContent = await response.json();

			console.log(content);

		} catch (ex) {
			ex.errors.forEach((error: string) => {
				switch (error) {
					case 'secret':
						isSecretInvalid = true;
						return;
					case 'passphrase':
						isPasshraseInvalid = true;
						return;
					case 'expiration':
						isExpirationInvalid = true;
						return;
				}
			});
		}
	}

	computeExpiration();
</script>

<Container class="border border-top-0 rounded-bottom">
	<Row class="pt-2">
		<Col>
			<h2>Enter the secret you want to hide !</h2>
		</Col>
	</Row>
	<Row>
		<Col>
			<Form on:submit={doHide}>
				<FormGroup>
					<Label for="yourSecret">Your secret :</Label>
					<Input type="text" name="yourSecret" id="yourSecret" placeholder="Don't be shy, your secret is safe with us !" bind:value={secret} bind:invalid={isSecretInvalid} />
				</FormGroup>

				<FormGroup>
					<Label for="yourPassphrase">Your passphrase :</Label>
					<Input type="text" name="yourPassphrase" id="yourPassphrase" placeholder="The recipient must have this pass phrase to reveal your secret" bind:value={passphrase} bind:invalid={isPasshraseInvalid} />
				</FormGroup>

				<FormGroup>
					<div class="pb-2">Secret expiration :</div>
					<InputGroup>
						<InputGroupText>Expires in</InputGroupText>
						<Input type="number" name="expirationDuration" id="expirationDuration" bind:value={expirationDuration} on:change={computeExpiration} bind:invalid={isExpirationInvalid}>
							<option>1</option>
							<option>2</option>
							<option>3</option>
							<option>4</option>
							<option>5</option>
						</Input>
						<Input type="select" name="expirationType" id="expirationType" bind:value={expirationType} on:change={computeExpiration} bind:invalid={isExpirationInvalid}>
							<option value="minutes">Minutes</option>
							<option value="hours">Hours</option>
							<option value="days">Days</option>
						</Input>
						<InputGroupText>{computedExpiration}</InputGroupText>
					</InputGroup>
				</FormGroup>

				<FormGroup>
					<Button type="submit">Hide this !</Button>
				</FormGroup>
			</Form>
		</Col>
	</Row>
</Container>
