<script lang="ts">
	import type { EncryptedContent, RevealedContent } from '$lib/types';
	import { encryptedContentValidation } from '$lib/validations';

	import { Row, Col, Container, Form, FormGroup, Label, Input, Button, Card, CardBody, Alert } from 'sveltestrap';

	let passphrase = '';
	let encrypted = '';
	let secret = '';

	let isEncryptedInvalid = false;
	let isPasshraseInvalid = false;

	let errorOccured = false;

	async function doReveal(e: Event) {
		e.preventDefault();

		const secretContent: EncryptedContent = {
			encrypted,
			passphrase
		};

		isEncryptedInvalid = isPasshraseInvalid = false;
		errorOccured = false;
		secret = '';

		try {
			await encryptedContentValidation.validate(secretContent);
			try {
				const response = await fetch('/api/reveal', {
					method: 'POST',
					body: JSON.stringify(secretContent),
					headers: {
						'Content-type': 'application/json; charset=UTF-8'
					}
				});

				errorOccured = response.status !== 200;

				var content: RevealedContent = await response.json();

				secret = content.secret;
			} catch {
				errorOccured = true;
			}
		} catch (ex) {
			ex.errors.forEach((error: string) => {
				switch (error) {
					case 'encrypted':
						isEncryptedInvalid = true;
						return;
					case 'passphrase':
						isPasshraseInvalid = true;
						return;
				}
			});
		}
	}
</script>

<Container class="border border-top-0 rounded-bottom">
	<Row class="pt-2">
		<Col>
			<h2>Enter the secret you want to reveal !</h2>
		</Col>
		<Row>
			<Col>
				<Form on:submit={doReveal}>
					<FormGroup>
						<Label for="yourSecret">Your secret :</Label>
						<Input type="text" name="yourSecret" id="yourSecret" placeholder="Enter the precious secret !" bind:value={encrypted} bind:invalid={isEncryptedInvalid} />
					</FormGroup>

					<FormGroup>
						<Label for="yourPassphrase">Your passphrase :</Label>
						<Input type="text" name="yourPassphrase" id="yourPassphrase" placeholder="This is the sesam to reveal the secret" bind:value={passphrase} bind:invalid={isPasshraseInvalid} />
					</FormGroup>

					<FormGroup>
						<Button type="submit">Reveal this !</Button>
					</FormGroup>
				</Form>

				{#if errorOccured}
					<Alert color="warning">
						<h4 class="alert-heading text-capitalize">An error occured while revealing your secret</h4>
						Your secret cannot be revealed, maybe it's expired or it's the wrong pass phrase.
					</Alert>
				{/if}
			</Col>
		</Row>
	</Row>

	{#if secret.length !== 0}
		<Row class="pb-3">
			<Col>
				<h3>Your secret has been revealed !</h3>
				<Card>
					<CardBody>{secret}</CardBody>
				</Card>
			</Col>
		</Row>
	{/if}
</Container>
