// @ts-check
const { test, expect } = require('@playwright/test');
const fs = require('fs');

async function readCredentialsFromJson() {
  try {
    // Read the JSON file
    const fileData = fs.readFileSync('credentials.json', 'utf8');
   
    const credentials = JSON.parse(fileData);
  
    const username = credentials.username;
    const password = credentials.password;

	console.log('Login Email: ', username);
    return { username, password };
  } catch (error) {
    console.error('Error reading credentials:', error);
    return null;
  }
}

async function generateRandomStringWithNumber() {
  const randomString = 'Automation_' + Math.floor(Math.random() * 1000000000);
  return randomString;
}

test.beforeEach(async ({ page }) => {
	await test.step('navigation', async() => {
		await page.goto('https://www.planarian.xyz/login');
	});
});


test('Planarian Login/Logout', async ({ page }) => {
	
	const { username, password } = await readCredentialsFromJson();
	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(/Planarian/);
	await expect(page).toHaveURL(/.*login/);
  
	
	await page.fill('#basic_emailAddress', username);
    await page.fill('#basic_password', password);
    await page.click('button span:has-text("Login")');

	await expect(page).toHaveURL(/.*projects/, { timeout: 12000 });
  
	await page.click('span:has-text("Logout")');
	await expect(page).toHaveURL(/.*login/);
	
  
});

test('Navigate to Existing Project', async ({ page }) => {
	
	const { username, password } = await readCredentialsFromJson();
	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(/Planarian/);
	await expect(page).toHaveURL(/.*login/);
  
  
	await page.fill('#basic_emailAddress', username);
    await page.fill('#basic_password', password);
    await page.click('button span:has-text("Login")');

	await expect(page).toHaveURL(/.*projects/);
  
	// Note: This Code is currently disabled since Adding New Projects will junk up the Database too much.
	//await page.click('button span:has-text("Add")');
	//await expect(page.locator("text=New Project")).toBeVisible();
	//const newProjectName = await generateRandomStringWithNumber();

	const newProjectName = "Automation_480705429";

	console.log('Project Name: ', newProjectName);

	await page.locator(`//div[text()="${newProjectName}"]/ancestor::a`).click();
	
	await expect(page.locator("text=Project Members")).toBeVisible();
	
	// Logout 
	await page.click('span:has-text("Logout")');
	await expect(page).toHaveURL(/.*login/);
	
  
});

test('Advanced Search', async ({ page }) => {
	
	const { username, password } = await readCredentialsFromJson();
	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(/Planarian/);
	await expect(page).toHaveURL(/.*login/);
  
	
	await page.fill('#basic_emailAddress', username);
    await page.fill('#basic_password', password);
    await page.click('button span:has-text("Login")');

	await expect(page).toHaveURL(/.*projects/, { timeout: 10000 });
  
	await page.click('button span:has-text("Advanced")');
	await expect(page.locator("text=Number of Trips")).toBeVisible();

	// Click on Up Spinner
	

	await page.click('button[aria-label="Close"]');


	await page.click('span:has-text("Logout")');
	await expect(page).toHaveURL(/.*login/);
	
  
});
