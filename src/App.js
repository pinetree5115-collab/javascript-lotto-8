import LottoGame from "./LottoGame.js";

class App {
  async run() {
    const game = new LottoGame();

    // 1.1~2.3 기능 실행 (구입 및 발행)
    await game.getPurchaseAmount();
    game.issueLottos();

    // 3.1~3.5 기능 실행 (당첨 번호 입력 및 결과 출력)
    // await game.getWinningNumbers(); // LottoGame에 추가할 메서드
  }
}

export default App;