import { Console } from "@woowacourse/mission-utils";
import LottoGame from "./LottoGame.js";

class App {
  async run() {
    const game = new LottoGame();

    try {
      // 1. 구입 금액 입력 및 로또 발행
      await game.getPurchaseAmount();
      game.issueLottos();

      // 2. 당첨 번호 입력 및 검증 (LottoGame에 구현된 반복 입력 처리)
      const winningLottoInstance = await game.getWinningNumbers();
      const winningNumbers = winningLottoInstance.getNumbers();

      // 3. 보너스 번호 입력 및 검증 (LottoGame에 구현된 반복 입력 처리)
      // LotteGame에 추가한 헬퍼 메서드를 통해 유효한 번호를 받습니다.
      const bonusNumber = await game.getBonusNumberValue();

      // 4. WinningLotto 객체 생성 (최종 중복 검사)
      // LottoGame.js의 calculateAndPrintResults에서 WinningLotto 객체를 생성합니다.

      // 5. 당첨 결과 계산 및 출력 (10~14번 기능)
      game.calculateAndPrintResults(winningNumbers, bonusNumber);

    } catch (error) {
      // 1.6번 기능: [ERROR] 메시지 출력 후 애플리케이션 종료
      Console.print(error.message);
      // 테스트 통과 및 비정상 종료 상태를 명확히 하기 위해 throw error를 유지합니다.
      throw error;
    }
  }
}

export default App;