const hardware = {
  // 首页 Infrastructure 区块大数字统计
  bigStats: [
    { value: '20', unit: 'TPS',  label: '满帧运行' },
    { value: '16', unit: 'GB',   label: '运行内存' },
    { value: '24', unit: '/ 7',  label: '持续在线' },
  ],

  // 规格卡片列表（iconKey 对应组件内的图标映射）
  specs: [
    { iconKey: 'cpu',     label: '处理器', value: 'AMD EPYC™',  sub: '高性能多核处理器' },
    { iconKey: 'ram',     label: '内存',   value: '16 GB',      sub: 'DDR5 高速内存' },
    { iconKey: 'storage', label: '存储',   value: 'SSD',        sub: '低延迟固态存储' },
    { iconKey: 'network', label: '网络',   value: '100 Mbps',   sub: '低延迟稳定专线' },
    { iconKey: 'server',  label: '服务端', value: 'Fabric',     sub: '高性能 Minecraft 核心' },
    { iconKey: 'version', label: '版本',   value: '1.21.1',     sub: 'Java Edition' },
  ],

  // 处理器品牌徽标文字（分两段渲染不同样式）
  chipLabel: { muted: 'AMD', brand: ' EPYC™' },

  // 服务器实际硬件配置（用于 sponsors.ts 导出）
  serverConfig: {
    cpu:     'AMD EPYC™ 9454P',
    ram:     '16GB DDR5 ECC',
    storage: 'NVMe SSD',
    network: '100 Mbps',
  },
}

export default hardware
