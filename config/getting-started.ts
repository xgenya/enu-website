const gettingStarted = {
  // 加入教程页面显示的服务器连接地址（玩家填入游戏的 IP）
  serverHost: 'eunoia.ink',

  // 服务器基本信息（显示于 IP 卡片）
  version: 'Java 1.21+',
  mode: '生存',
  season: '第 2 周目',
  difficulty: '困难',

  // QQ 群邀请链接（通用分享链接，过期后需更新）
  qqGroupUrl:
    'https://qun.qq.com/universal-share/share?ac=1&authKey=LXv0cr308KBlKU5e6oAMEXVSLqhdh0CmwjIY6DgxMqwaiW%2FdvIe7IBMzB%2BYB2kB2&busi_data=eyJncm91cENvZGUiOiI3MzQ4NTg1ODEiLCJ0b2tlbiI6InFXNC95MGRaRnVWZVFBSDVxOWhVY2tIV0JTb05DdXhsK3hNb3BXSmdNYUZXVC9HODVRMllkR25nOGhzMnlVaDEiLCJ1aW4iOiIxNDE4MDM0NTMxIn0%3D&data=EAUoW0ls7v5Yo0ZCCJ1FU7Qqeo-WPok4WQnDSN45vJ60cXUr8LeMncPz1A1h8tfeXaz63VLIRqWUTx4nbctQjA&svctype=4&tempid=h5_group_info',

  whitelistNote:
    '本服务器为白名单制度，需要加入 QQ 群并在群内申请白名单资格后方可进入。',

  // 推荐 Mod 列表（badge: 推荐等级标签）
  mods: [
    {
      name: "Xaero's World Map",
      desc: '全屏世界地图，显示你探索过的区域，配合小地图使用效果最佳。',
      icon: 'https://cdn.modrinth.com/data/NcUtCpym/354080f65407e49f486fcf9c4580e82c45ae63b8_96.webp',
      href: 'https://modrinth.com/mod/xaeros-world-map',
      badge: '必装',
    },
    {
      name: "Xaero's Minimap",
      desc: '屏幕角落显示周边地形小地图，支持创建路径点标记位置。',
      icon: 'https://cdn.modrinth.com/data/1bokaNcj/354080f65407e49f486fcf9c4580e82c45ae63b8_96.webp',
      href: 'https://modrinth.com/mod/xaeros-minimap',
      badge: '必装',
    },
  ],

  // 推荐整合包
  modpack: {
    name: 'XPlus PerioTable Modpack (Fabric)',
    desc: '包含上述地图 Mod 的整合包，提升原版游戏体验且不改变游戏机制，推荐直接使用。',
    icon: 'https://cdn.modrinth.com/data/UCpApD3P/eb989b0763ca1ad11ee37e879ff2024294db410f_96.webp',
    href: 'https://modrinth.com/modpack/xplus-2.0-modpack-global',
    badge: '推荐整合包',
  },

  // 正版用户加入步骤（mods: 是否展示 Mod 列表，typing: 是否展示 IP 输入动画，register: 是否展示注册指令）
  stepsOfficial: [
    {
      step: '01',
      title: '检查 Mod',
      desc: '加入服务器之前，请确保当前使用的整合包内有以下两个 Mod，如果没有自己的整合包，也可以使用 XPlus 原版生电优化整合包。',
      link: null,
      mods: true,
    },
    {
      step: '02',
      title: '启动游戏',
      desc: '使用你喜欢的启动器来启动游戏。',
      link: null,
    },
    {
      step: '03',
      title: '进入多人游戏',
      desc: '在主界面点击「多人游戏」，然后选择「添加服务器」。',
      link: null,
    },
    {
      step: '04',
      title: '填入服务器地址',
      desc: '服务器名称随意填写，地址填入上方的服务器 IP，点击完成。',
      link: null,
      typing: true,
    },
    {
      step: '05',
      title: '加入游戏',
      desc: '双击服务器即可连接，初次进入可能需要等待几秒加载。',
      link: null,
    },
    {
      step: '06',
      title: '游戏内注册',
      desc: '进入游戏后，根据聊天框提示，输入指令完成注册。',
      link: null,
      register: true,
    },
  ],

  // 离线（盗版）用户加入步骤
  stepsCracked: [
    {
      step: '01',
      title: '下载第三方启动器',
      desc: '推荐使用 PCL2 或 HMCL，免费开源，支持自动安装游戏本体。',
      link: { label: '下载 PCL2', href: 'https://afdian.com/p/0164034c016c11ebafce52540025c377' },
    },
    {
      step: '02',
      title: '检查 Mod',
      desc: '加入服务器之前，请确保当前使用的整合包内有以下两个 Mod，如果没有自己的整合包，也可以使用 XPlus 原版生电优化整合包。',
      link: null,
      mods: true,
    },
    {
      step: '03',
      title: '添加离线账号',
      desc: '打开启动器，选择「离线登录」或「添加账号 → 离线账号」，随意输入一个用户名。',
      link: null,
    },
    {
      step: '04',
      title: '进入多人游戏',
      desc: '启动游戏后，在主界面点击「多人游戏」→「添加服务器」。',
      link: null,
    },
    {
      step: '05',
      title: '填入服务器地址',
      desc: '服务器名称随意填写，地址填入上方的服务器 IP，点击完成后双击连接。',
      link: null,
      typing: true,
    },
    {
      step: '06',
      title: '游戏内注册',
      desc: '进入游戏后，根据聊天框提示，输入指令完成注册。',
      link: null,
      register: true,
    },
  ],

  // 离线用户可选：配置 LittleSkin 显示皮肤
  crackedOptional: {
    title: '可选：显示皮肤（LittleSkin）',
    desc: '如果希望在服务器中显示自定义皮肤，可按以下步骤配置 LittleSkin。',
    steps: [
      {
        text: '前往 LittleSkin 官网，按要求注册并绑定账号。注册完成后点击「添加角色」，输入步骤 03 中填写的用户名。',
        link: { label: '前往 LittleSkin', href: 'https://littleskin.cn/' },
      },
      {
        text: '打开 PCL2，进入对应版本的「版本设置」，将登录方式改为「第三方登录 Authlib Injector」或「LittleSkin」。',
        link: null,
      },
      {
        text: '认证服务器填写 https://littleskin.cn/api/yggdrasil，注册链接填写 https://littleskin.cn/auth/register，最后点击「设置为 LittleSkin」。',
        link: null,
      },
    ],
  },

  // 警示红线（严重违规行为提示）
  redLines: [
    '严禁尝试和其他玩家进行私下交易，谨防电信诈骗！',
    '严禁侮辱、造谣、性骚扰其他玩家，泄露他人隐私。',
  ],

  // 封禁规则列表
  bans: [
    { text: '禁止使用矿透、卡服等作弊手段。' },
    { text: '禁止开挂（Meteor、Wurst、LiquidBounce、RusherHack、Nami、Mio、Alien、Acid、Baritone 等），一经发现严格处理。' },
    { text: '禁止私造大型红石装置（8 核以上刷铁机、空置域、全物品、百万刷怪塔等），大型装置需管理员审批。' },
    { text: '禁止使用非绿玩功能，公共设施尽量共享使用。' },
    { text: '禁止私自破坏他人装置或建筑，一次警告，再次踢出。' },
    { text: '不熟悉的机器请勿随意启动，可咨询其他玩家或群内询问。' },
  ],

  // 基本行为准则
  basics: [
    { icon: '🧱', text: '不破坏他人建筑，不偷窃他人物品。' },
    { icon: '⚔️', text: '未经同意不对其他玩家发起 PVP。' },
    { icon: '💬', text: '聊天友善，不刷屏，不传播不良信息。' },
    { icon: '🌍', text: '大规模改地形前请告知管理员。' },
  ],
}

export default gettingStarted
