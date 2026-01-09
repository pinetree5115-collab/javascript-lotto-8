import LottoController from "./controller/LottoController.js";

class App {
  async play() {
    const controller = new LottoController();
    await controller.start();
  }

  async run() {
    await this.play();
  }
}

export default App;