const finance = {
  // 赞助记录（name: 赞助者, amount: 金额/元, date: 年-月）
  sponsors: [
    { name: 'zhang1322', amount: 100, date: '2026-03' },
  ],

  // 支出记录（recurring: 是否为每月固定支出）
  expenses: [
    { item: '服务器月租', amount: 800, date: '2026-04', recurring: true },
  ],
}

export default finance
