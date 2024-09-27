export const host = Cypress.env('testEnv') === 'prod' ? 'https://www.biz-web-client-demo.com' : 'http://localhost:3000';

export const mockAcc1 = 'biz-web-client-demo.cypresstest1@gmail.com'
export const mockAcc1Pw = 'cypresstest1!'

export const mockAcc2 = 'biz-web-client-demo.cypresstest2@gmail.com'
export const mockAcc2Pw = 'cypresstest2!'

export const mockAcc3 = 'biz-web-client-demo.cypresstest3@gmail.com'
export const mockAcc3Pw = 'cypresstest3!'

// pathnames
export const dashboard = '/dashboard'
export const path = '/path'