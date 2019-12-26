import Application from '../lib';

const app = new Application();
app.listen(3000, (): void => {
    console.log(123);
});
