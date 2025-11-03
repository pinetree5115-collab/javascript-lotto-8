import { Console } from "@woowacourse/mission-utils";
import LottoGame from "./LottoGame.js";

class App {
  async run() {
    const game = new LottoGame();

    try {
      await game.getPurchaseAmount(); // 1.1, 1.2
      game.issueLottos(); // 2.1, 2.3

      // 당첨 번호 입력 및 검증
      const winningNumbersInput = await Console.readLineAsync("\n당첨 번호를 입력해 주세요.\n");
      const winningNumbers = winningNumbersInput.split(',').map(n => parseInt(n.trim(), 10));

      // 보너스 번호 입력 및 검증
      const bonusNumberInput = await Console.readLineAsync("\n보너스 번호를 입력해 주세요.\n");
      const bonusNumber = parseInt(bonusNumberInput.trim(), 10);

      // ✨ 3, 4번: LottoGame에서 반복 입력 처리
      const winningLottoInstance = await game.getWinningNumbers();

      // ✨ 5, 6번: WinningLotto 인스턴스 생성 시 보너스 번호 검증까지 처리됨
      const fullWinningLotto = await game.getBonusNumber(winningLottoInstance);

      // 10~14번 기능 실행
      game.calculateAndPrintResults(winningNumbers, bonusNumber);

    } catch (error) {
      // ... (catch 블록은 그대로)
    }
  }
}

export default App;