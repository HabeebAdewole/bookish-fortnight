import { chromium } from 'playwright'
import AxeBuilder from '@axe-core/playwright'
import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'

const base = process.env.FORM_AUDIT_URL || 'http://127.0.0.1:5191'
const output = new URL('../../project-docs/compliance/', import.meta.url)
await mkdir(output, { recursive: true })
const browser = await chromium.launch({ channel: process.env.FORM_BROWSER_CHANNEL || 'chrome', headless: true })
const context = await browser.newContext({ reducedMotion: 'reduce', acceptDownloads: true })
const page = await context.newPage()
const errors = []; const external = new Set(); const failures = []; const scans = []
page.on('pageerror', e => errors.push(e.message))
page.on('request', request => { if (!request.url().startsWith(base) && !/^(data|blob):/.test(request.url())) external.add(request.url()) })
const allRoutes = ['/', '/classes', '/coaches', '/coaches/amara-okafor', '/coaches/daniel-cole', '/coaches/tomi-adeyemi', '/membership', '/about', '/contact', '/login', '/signup', '/reset-password', '/member', '/member/classes', '/member/membership', '/member/checkout?plan=Rhythm', '/member/profile', '/admin', '/admin/members', '/admin/members/FM-1001', '/admin/schedule', '/admin/trainers', '/admin/payments', '/privacy', '/terms', '/cookies', '/refunds', '/settings', '/service-information']
const routes = process.env.FORM_AUDIT_ROUTES ? process.env.FORM_AUDIT_ROUTES.split(',') : allRoutes
try {
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 950 })
    for (const route of routes) {
      const response = await page.goto(`${base}/#${route}`)
      await page.locator('h1').waitFor({ state: 'visible' })
      await page.evaluate(() => document.fonts.ready)
      const dom = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > window.innerWidth,
        missingAlt: [...document.images].filter(image => !image.hasAttribute('alt')).map(image => image.src),
        brokenReferences: [...document.querySelectorAll('[aria-describedby], [aria-labelledby]')].flatMap(element => ['aria-describedby', 'aria-labelledby'].flatMap(attr => (element.getAttribute(attr) || '').split(/\s+/).filter(id => id && !document.getElementById(id)))),
      }))
      const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa', 'best-practice']).analyze()
      scans.push({ route, width, ...dom, violations: axe.violations.map(({ id, impact, help, nodes }) => ({ id, impact, help, nodes: nodes.map(({ target, failureSummary }) => ({ target, failureSummary })) })), incomplete: axe.incomplete.map(({ id, nodes }) => ({ id, count: nodes.length })) })
      if (response && !response.headers()['content-security-policy']) failures.push('Missing CSP response header')
      console.log(`${width} ${route}: ${axe.violations.length} violations`)
    }
  }
  for (const width of [320, 834, 540, 1114]) {
    await page.setViewportSize({ width, height: 950 })
    for (const route of ['/privacy', '/terms', '/cookies', '/refunds', '/settings', '/contact', '/signup']) {
      await page.goto(`${base}/#${route}`)
      if (await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)) failures.push(`Overflow ${width} ${route}`)
    }
  }
  await page.setViewportSize({ width: 1440, height: 950 })
  await page.goto(`${base}/`)
  await page.keyboard.press('Tab')
  assert.equal(await page.locator('.skip-link').evaluate(element => element === document.activeElement), true)
  await page.keyboard.press('Enter')
  assert.equal(await page.evaluate(() => document.activeElement.id), 'main')
  // Public browsing does not save identifiers, cookies or optional preferences.
  assert.deepEqual(await page.evaluate(() => Object.keys(localStorage)), [])
  assert.deepEqual(await context.cookies(), [])
  await page.goto(`${base}/#/contact`)
  await page.getByLabel('Your name', { exact: true }).fill('Test member')
  await page.getByLabel('Email address', { exact: true }).fill('member@example.com')
  await page.getByLabel('What can we help with?').selectOption({ label: 'Membership plans' })
  await page.getByLabel('Your message', { exact: true }).fill('Please explain the membership options.')
  await page.getByRole('button', { name: 'Review enquiry', exact: true }).click()
  assert.equal(await page.locator('#contact-privacy').evaluate(element => element === document.activeElement), true)
  await page.locator('#contact-privacy').press('Space')
  await page.getByRole('button', { name: 'Review enquiry', exact: true }).click()
  await page.getByText('Your enquiry passed the local checks. It has not been sent. You can review or edit your details.', { exact: true }).waitFor()
  await page.goto(`${base}/#/signup`)
  await page.getByLabel('Full name', { exact: true }).fill('Test member')
  await page.getByLabel('Email address', { exact: true }).fill('member@example.com')
  await page.getByLabel('Password', { exact: true }).fill('ExampleOnly123!')
  await page.getByLabel('Confirm password', { exact: true }).fill('ExampleOnly123!')
  await page.getByRole('button', { name: 'Create account', exact: false }).click()
  assert.equal(await page.locator('#signup-terms').evaluate(element => element === document.activeElement), true)
  await page.locator('#signup-terms').press('Space')
  await page.getByRole('button', { name: 'Create account', exact: false }).click()
  await page.getByText('Your details passed the local form checks. No account was created.', { exact: true }).waitFor()
  assert.deepEqual(await page.evaluate(() => Object.keys(localStorage)), [])
  await page.goto(`${base}/#/member/profile`)
  await page.getByLabel('Display name', { exact: true }).fill('Privacy test')
  await page.getByRole('button', { name: 'Save profile', exact: true }).click()
  assert.equal(await page.getByText('Profile updated.', { exact: true }).isVisible(), true)
  await page.goto(`${base}/#/settings`)
  await page.getByRole('button', { name: 'Pause automatic motion', exact: true }).first().click()
  await page.reload()
  assert.equal(await page.getByRole('button', { name: 'Resume automatic motion', exact: true }).first().getAttribute('aria-pressed'), 'true')
  const downloadPromise = page.waitForEvent('download')
  await page.getByRole('button', { name: 'Export FORM browser data', exact: true }).click()
  const download = await downloadPromise
  await download.saveAs(new URL('browser-export-test.json', output).pathname.replace(/^\/(?:([A-Z]:))/, '$1'))
  await page.getByRole('button', { name: 'Clear FORM browser data', exact: true }).click()
  await page.getByRole('button', { name: 'Keep my data', exact: true }).press('Escape')
  assert.equal(await page.getByRole('button', { name: 'Clear FORM browser data', exact: true }).evaluate(element => element === document.activeElement), true)
  // Preserve unrelated site keys when clearing FORM-owned records.
  await page.evaluate(() => localStorage.setItem('unrelated-test-key', 'keep'))
  await page.getByRole('button', { name: 'Clear FORM browser data', exact: true }).click()
  await page.getByRole('button', { name: 'Confirm clear and reload', exact: true }).click()
  await page.waitForLoadState('domcontentloaded')
  assert.deepEqual(await page.evaluate(() => Object.keys(localStorage)), ['unrelated-test-key'])
  await page.evaluate(() => localStorage.removeItem('unrelated-test-key'))
  await page.getByRole('button', { name: 'Pause automatic motion', exact: true }).first().waitFor()
  await page.screenshot({ path: new URL('settings-desktop.png', output).pathname.replace(/^\/(?:([A-Z]:))/, '$1'), fullPage: true })
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto(`${base}/#/privacy`)
  await page.screenshot({ path: new URL('privacy-mobile.png', output).pathname.replace(/^\/(?:([A-Z]:))/, '$1'), fullPage: true })
} catch (error) { failures.push(error.stack || error.message) }
finally {
  const report = { generatedAt: new Date().toISOString(), base, browser: browser.version(), scans, failures, errors, externalRequests: [...external] }
  await writeFile(new URL('browser-audit.json', output), JSON.stringify(report, null, 2))
  const violations = scans.reduce((sum, scan) => sum + scan.violations.length, 0)
  console.log(JSON.stringify({ scans: scans.length, violations, failures, errors, externalRequests: [...external] }, null, 2))
  await browser.close()
  if (failures.length || errors.length || violations || external.size || scans.some(scan => scan.overflow || scan.missingAlt.length || scan.brokenReferences.length)) process.exitCode = 1
}
