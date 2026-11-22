'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import bellatoImage from '../public/Images/bcc.webp';
import coraImage from '../public/Images/ccc.webp';
import accretiaImage from '../public/Images/acc.webp';
import raceImage from '../public/Images/race.webp';
import NEWS_ITEMS from '../public/news/news.json';
import GUILDS_DATA from '../public/guilds/guilds.json';
import STREAMERS_DATA from '../public/streamers/streamers.json';
import CRAFTING_RECIPES from '../public/crafting/crafting.json';
import DROP_LIST_DATA from '../public/droplist/droplist.json';
import {
  Menu,
  X,
  ChevronDown,
  Download,
  Shield,
  Swords,
  Zap,
  Users,
  Trophy,
  Crown,
  Flame,
  Search,
  CheckCircle2,
  Check,
  Clock,
  Server,
  Monitor,
  Hammer,
  Sparkles,
  Crosshair,
  MapPin,
  Skull,
  Star,
  ChevronRight,
  ChevronLeft,
  Info,
  MessageSquare,
  BookOpen,
  Package,
  FileDown,
  HelpCircle,
  Radio,
  Copy,
  FlaskConical,
  Volume2,
  VolumeX,
} from 'lucide-react';

// ============================================================================
// 1. DATA MODULES (Server Info, News, Races, Guilds, Streamers, Rankings,
//    Downloads, Crafting Recipes, Drop List)
// ============================================================================

const SERVER_RATES = [
  { label: 'MAX LEVEL', value: '55', sub: 'Level cap' },
  { label: 'EXP RATE', value: 'HIGH', sub: 'Experience' },
  { label: 'DROP RATE', value: 'MID', sub: 'Item drops' },
  { label: 'MINING RATE', value: 'HIGH', sub: 'Mining' },
  { label: 'ANIMUS RATE', value: 'MID', sub: 'Animus' },
  { label: 'SELL RATE', value: 'LOW', sub: 'NPC sales' },
  { label: 'SERVER TYPE', value: 'PVP', sub: 'Old-school style' },
];

const SERVER_CHECKLIST = [
  {
    title: 'PvP & Classic Style',
    items: [
      'PvP-ready items',
      'Bringing back old-style PvP',
      'Basic default concepts',
      'No MU-like over-the-top lightning skins',
    ],
  },
  {
    title: 'Donations & Community Perks',
    items: [
      'No overpowered edited donations',
      'Cash Points donation',
      'RMT priority server',
      'Guild perks',
      'Streamer perks',
    ],
  },
];

const RACES_DATA = {
  bellato: {
    id: 'bellato',
    image: bellatoImage,
    tabLabel: 'BELLATO UNION',
    name: 'BELLATO UNION',
    tagline: 'MASTERS OF MECHANIZED WARFARE & ARCANE ENGINEERING',
    accent: '#fbbf24',
    badgeClass: 'text-amber-300 border-amber-400/35 bg-amber-500/10',
    signature: 'Goliath & Catapult MAUs • Holy Chandra Support',
    description:
      'A brilliant federation of engineers, merchants, and Force-sensitive pioneers. Bellato pilots command devastating Massive Armor Units (MAUs) while their Holy Chandras sustain entire legions across the volcanic trenches of Crag Mine.',
    perks: [
      'Exclusive Massive Armor Units (Catapult & Goliath MAUs)',
      'Unrivaled Healing & Buff Support via Holy Chandra',
      'Versatile Force Magic & Agile Berserker Fighters',
    ],
    stats: [
      { label: 'FIREPOWER', value: 85 },
      { label: 'DEFENSE', value: 84 },
      { label: 'MOBILITY', value: 88 },
      { label: 'UTILITY', value: 96 },
    ],
  },
  cora: {
    id: 'cora',
    image: coraImage,
    tabLabel: 'HOLY ALLIANCE CORA',
    name: 'HOLY ALLIANCE CORA',
    tagline: 'DEVOUT WIELDERS OF DARK FORCE & ANCIENT ANIMUS',
    accent: '#f97316',
    badgeClass: 'text-orange-300 border-orange-400/35 bg-orange-500/10',
    signature: 'Isis, Hecate, Paimon & Inanna Animus • Dark Force',
    description:
      'Bound by unwavering faith in Decem, the Holy Alliance Cora channels scorching Dark Force spells and summons colossal Animus guardians to overwhelm enemy lines with lethal burst damage and spiritual precision.',
    perks: [
      'Summonable Animus Guardians (Isis, Hecate, Paimon, Inanna)',
      'Highest Single-Target & AoE Force Burst Damage',
      'Lethal Evade Rangers & Assassin-Class Strikers',
    ],
    stats: [
      { label: 'FIREPOWER', value: 96 },
      { label: 'DEFENSE', value: 75 },
      { label: 'MOBILITY', value: 90 },
      { label: 'UTILITY', value: 86 },
    ],
  },
  accretia: {
    id: 'accretia',
    image: accretiaImage,
    tabLabel: 'ACCRETIA EMPIRE',
    name: 'ACCRETIA EMPIRE',
    tagline: 'RELENTLESS CYBERNETIC LEGIONS & HEAVY SIEGE ARTILLERY',
    accent: '#ef4444',
    badgeClass: 'text-red-300 border-red-400/35 bg-red-500/10',
    signature: 'Heavy Rocket Launchers • Siege Kits • Net Debuffs',
    description:
      'Having forged flesh into cold volcanic steel, the Accretia Empire marches as an unstoppable mechanized war machine. Equipped with Siege Kits and high-caliber Launchers, their concentrated fire reduces fortresses to ash.',
    perks: [
      'Exclusive Heavy Rocket Launchers & Siege Kits',
      'Highest Base HP & Physical Armor Durability',
      'Devastating Grenade Debuffs & Tactical Traps',
    ],
    stats: [
      { label: 'FIREPOWER', value: 95 },
      { label: 'DEFENSE', value: 94 },
      { label: 'MOBILITY', value: 74 },
      { label: 'UTILITY', value: 79 },
    ],
  },
};

const WAR_FEATURES = [
  {
    icon: Shield,
    title: 'ANTI-CHEAT PROTECTION',
    description:
      'Kernel-level shield with real-time packet verification blocks speed hacks, fly hacks, and unauthorized macro automation.',
  },
  {
    icon: Sparkles,
    title: 'BALANCED ECONOMY',
    description:
      'Every end-game Relic, Leon, and +5/+6 upgrade is farmable through Pit Bosses, crafting, and player-driven trading.',
  },
  {
    icon: MessageSquare,
    title: '24/7 ACTIVE GM SUPPORT',
    description:
      'Dedicated Game Masters and rapid Discord ticket resolution keep daily events smooth and fair play strictly enforced.',
  },
  {
    icon: Flame,
    title: 'COMPETITIVE CHIP WARS',
    description:
      'Three daily Crag Mine wars with live Archon commands, Holystone Keeper battles, and lucrative Ore Mine control.',
  },
  {
    icon: Users,
    title: 'CUSTOM GUILD SYSTEMS',
    description:
      'Enhanced guild leaderboards, weekly 8v8 arena brackets, custom emblems, and shared Pit Boss raid bounties.',
  },
  {
    icon: Server,
    title: 'LOW-LATENCY ASIA / GLOBAL PROXY',
    description:
      'Enterprise DDoS-mitigated Singapore, PH, and Global routing delivers crisp sub-30ms response times in mass wars.',
  },
];

const TOP_PLAYERS_DATA = [];
const TOP_GUILDS_RANKING = [];
const ARCHONS_COUNCIL_DATA = [];

const DISCORD_URL = process.env.NEXT_PUBLIC_DISCORD_URL;
const DOWNLOADS_ENABLED = process.env.NEXT_PUBLIC_DOWNLOADS_ENABLED === 'true';

const DOWNLOAD_MIRRORS = [
  {
    id: 'gdrive',
    name: 'Google Drive',
    badge: 'RECOMMENDED',
    speed: 'High Speed • Global',
    size: '2.45 GB',
    version: 'v2.2.3.2 Full',
    file: 'RF_ArchonsOfNovus_v2.2.3.2.rar',
    sha256: '8f4a2e91c7d3...b904e1',
    accent: 'from-amber-500 via-orange-600 to-red-600',
    url: process.env.NEXT_PUBLIC_DOWNLOAD_GOOGLE_DRIVE_URL,
  },
  {
    id: 'mega',
    name: 'MEGA.nz',
    badge: 'MIRROR 1',
    speed: 'Encrypted • Fast SEA',
    size: '2.45 GB',
    version: 'v2.2.3.2 Full',
    file: 'RF_ArchonsOfNovus_v2.2.3.2.rar',
    sha256: '8f4a2e91c7d3...b904e1',
    accent: 'from-red-600 to-orange-700',
    url: process.env.NEXT_PUBLIC_DOWNLOAD_MEGA_URL,
  },
  {
    id: 'mediafire',
    name: 'MediaFire',
    badge: 'MIRROR 2',
    speed: 'Resume Supported',
    size: '2.45 GB',
    version: 'v2.2.3.2 Full',
    file: 'RF_ArchonsOfNovus_v2.2.3.2.rar',
    sha256: '8f4a2e91c7d3...b904e1',
    accent: 'from-orange-500 to-amber-700',
    url: process.env.NEXT_PUBLIC_DOWNLOAD_MEDIAFIRE_URL,
  },
];

const SYSTEM_REQUIREMENTS = [
  { spec: 'Operating System', min: 'Windows 7 / 8 / 10 (64-bit)', rec: 'Windows 10 / 11 (64-bit)' },
  { spec: 'Processor (CPU)', min: 'Intel Core i3-4130 / AMD FX-6300', rec: 'Intel Core i5-9400F / Ryzen 5 3600' },
  { spec: 'Memory (RAM)', min: '4 GB RAM', rec: '8 GB RAM or higher' },
  { spec: 'Graphics (GPU)', min: 'NVIDIA GT 730 / Intel UHD 620', rec: 'NVIDIA GTX 1050 Ti / RX 570' },
  { spec: 'DirectX', min: 'Version 9.0c', rec: 'Version 9.0c + DirectX Runtime' },
  { spec: 'Storage Space', min: '8 GB Available HDD', rec: '10 GB Available SSD' },
];

const INSTALL_STEPS = [
  {
    step: '01',
    title: 'Download & Extract Full Client',
    desc: 'Download the full client archive from any mirror above and extract it to a clean folder (e.g., C:\\Games\\RF_ArchonsOfNovus) using WinRAR or 7-Zip.',
  },
  {
    step: '02',
    title: 'Add Defender Exclusion',
    desc: 'Open Windows Security → Virus & Threat Protection → Exclusions, and add the game folder so the anti-cheat shield is not quarantined.',
  },
  {
    step: '03',
    title: 'Run Launcher as Admin',
    desc: 'Right-click ArchonsLauncher.exe and select "Run as Administrator". Allow the auto-updater to verify and apply the latest patch files.',
  },
  {
    step: '04',
    title: 'Configure & Enter Novus',
    desc: 'Open Settings in the launcher to pick Windowed or Borderless Fullscreen mode, set your audio device, and click PLAY NOW!',
  },
];

// ============================================================================
// 2. REUSABLE <ArchonsLogo />
// ============================================================================

const ArchonsLogo = ({
  size = 'md',
  showText = false,
  className = '',
}) => {
  const sizeMap = {
    sm: 'h-10 w-10',
    md: 'h-11 w-11 sm:h-12 sm:w-12',
    lg: 'h-40 w-40 sm:h-56 sm:w-56 md:h-64 md:w-64',
    footer: 'h-14 w-14',
  };

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <Image
        src="/Images/logo.png"
        alt={showText ? '' : 'RF Archons of Novus Logo'}
        width={size === 'lg' ? 768 : 256}
        height={size === 'lg' ? 768 : 256}
        sizes={size === 'lg' ? '(max-width: 639px) 80vw, (max-width: 1023px) 70vw, 768px' : '56px'}
        className={`${sizeMap[size]} object-contain select-none drop-shadow-[0_0_18px_rgba(249,115,22,0.55)]`}
      />
      {showText && (
        <div className="flex flex-col leading-none text-left">
          <span className="font-cinzel font-black tracking-wider text-sm sm:text-base text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-orange-500 drop-shadow-[0_0_10px_rgba(245,158,11,0.35)]">
            RF ARCHONS OF NOVUS
          </span>
          <span className="text-[9px] tracking-[0.28em] text-amber-400/75 font-rajdhani font-semibold uppercase mt-0.5">
            RISING FORCE ONLINE
          </span>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// 3. CUSTOM METALLIC EMBER SVG GRAPHICS (Guild Crests, Race Showcase, CTA)
// ============================================================================

const GuildCrestSVG = ({ type, race }) => {
  const raceColor =
    race === 'Bellato' ? '#fbbf24' : race === 'Cora' ? '#f97316' : '#ef4444';

  const renderInnerIcon = () => {
    const props = { className: 'w-6 h-6', style: { color: raceColor } };
    switch (type) {
      case 'crown':
        return <Crown {...props} />;
      case 'flame':
        return <Flame {...props} />;
      case 'shield':
        return <Shield {...props} />;
      case 'zap':
        return <Zap {...props} />;
      case 'skull':
        return <Skull {...props} />;
      case 'crosshair':
        return <Crosshair {...props} />;
      case 'star':
        return <Star {...props} />;
      default:
        return <Swords {...props} />;
    }
  };

  return (
    <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_14px_rgba(249,115,22,0.45)]">
        <defs>
          <linearGradient id={`emberCrest-${type}`} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="50%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#991b1b" />
          </linearGradient>
        </defs>
        <path
          d="M15 28 L5 42 L18 55 L10 72 L30 78 L50 94 L70 78 L90 72 L82 55 L95 42 L85 28 L72 34 L50 10 L28 34 Z"
          fill="#1b110c"
          stroke={`url(#emberCrest-${type})`}
          strokeWidth="2.5"
        />
        <polygon
          points="50,22 72,36 68,66 50,80 32,66 28,36"
          fill="#0c0705"
          stroke={raceColor}
          strokeWidth="1.5"
          strokeOpacity="0.85"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center pt-1">
        {renderInnerIcon()}
      </div>
    </div>
  );
};

const RaceEmblemShowcase = ({ race }) => (
  <div className="relative flex items-center justify-center w-full min-h-72">
    <div
      className="absolute w-64 h-64 rounded-full blur-3xl opacity-40 transition-all duration-500"
      style={{ background: `radial-gradient(circle, ${race.accent}, transparent 70%)` }}
    />
    <Image
      src={race.image}
      alt={`${race.name} warrior`}
      sizes="(max-width: 1023px) calc(100vw - 32px), (max-width: 1279px) 50vw, 512px"
      className="relative w-full max-w-[512px] h-auto object-contain"
    />

    <div
      className="absolute bottom-3 px-4 py-1 rounded-full text-[11px] font-rajdhani font-bold tracking-widest uppercase border backdrop-blur-md"
      style={{
        borderColor: `${race.accent}66`,
        backgroundColor: 'rgba(15, 9, 7, 0.9)',
        color: race.accent,
      }}
    >
      {race.id === 'bellato' ? 'MAU DIVISION' : race.id === 'cora' ? 'ANIMUS LEGION' : 'SIEGE ARTILLERY'}
    </div>
  </div>
);

// ============================================================================
// 4. SHARED NAVIGATION, FOOTER, MODAL & TOAST COMPONENTS
// ============================================================================

const Navbar = ({ activePage, onNavigate, onScrollToSection }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [gameInfoOpen, setGameInfoOpen] = useState(false);
  const [gameCpOpen, setGameCpOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const gameCpRef = useRef(null);
  const mobileGameCpRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setGameInfoOpen(false);
      }
      const outsideDesktopGameCp =
        !gameCpRef.current || !gameCpRef.current.contains(e.target);
      const outsideMobileGameCp =
        !mobileGameCpRef.current || !mobileGameCpRef.current.contains(e.target);
      if (outsideDesktopGameCp && outsideMobileGameCp) {
        setGameCpOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLinkClick = (action) => {
    setMobileOpen(false);
    setGameInfoOpen(false);
    setGameCpOpen(false);
    action();
  };

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full border-b transition-[background-color,box-shadow,border-color] duration-300 ${
        isScrolled
          ? 'bg-black/50 border-orange-500/20 shadow-lg'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <button
          onClick={() => handleLinkClick(() => onNavigate('home'))}
          className="focus:outline-none cursor-pointer"
          aria-label="RF Archons of Novus Home"
        >
          <ArchonsLogo size="sm" showText />
        </button>

        {/* Center: Desktop Menu */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <button
            onClick={() => handleLinkClick(() => onNavigate('home'))}
            className={`px-3.5 py-2 rounded-lg text-xs font-rajdhani font-bold tracking-widest uppercase transition-colors cursor-pointer ${
              activePage === 'home'
                ? 'text-amber-400 bg-orange-500/15 border border-orange-500/25'
                : 'text-[#d6cdc5] hover:text-white hover:bg-orange-500/10'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => handleLinkClick(() => onScrollToSection('server'))}
            className="px-3.5 py-2 rounded-lg text-xs font-rajdhani font-bold tracking-widest uppercase text-[#d6cdc5] hover:text-white hover:bg-orange-500/10 transition-colors cursor-pointer"
          >
            Server
          </button>

          <button
            onClick={() => handleLinkClick(() => onScrollToSection('ranking'))}
            className="px-3.5 py-2 rounded-lg text-xs font-rajdhani font-bold tracking-widest uppercase text-[#d6cdc5] hover:text-white hover:bg-orange-500/10 transition-colors cursor-pointer"
          >
            Ranking
          </button>

          <button
            onClick={() => handleLinkClick(() => onNavigate('download'))}
            className={`px-3.5 py-2 rounded-lg text-xs font-rajdhani font-bold tracking-widest uppercase transition-colors cursor-pointer ${
              activePage === 'download'
                ? 'text-amber-400 bg-orange-500/15 border border-orange-500/25'
                : 'text-[#d6cdc5] hover:text-white hover:bg-orange-500/10'
            }`}
          >
            Download
          </button>

          {/* Game Info Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setGameInfoOpen((prev) => !prev)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-rajdhani font-bold tracking-widest uppercase transition-colors cursor-pointer ${
                activePage === 'crafting' || activePage === 'droplist'
                  ? 'text-amber-400 bg-orange-500/15 border border-orange-500/25'
                  : 'text-[#d6cdc5] hover:text-white hover:bg-orange-500/10'
              }`}
            >
              Game Info
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  gameInfoOpen ? 'rotate-180 text-amber-400' : ''
                }`}
              />
            </button>

            {gameInfoOpen && (
              <div className="absolute right-0 mt-2 w-52 rounded-xl bg-[#160e0b]/95 backdrop-blur-xl border border-orange-500/30 shadow-[0_12px_40px_rgba(0,0,0,0.8)] py-2 overflow-hidden">
                <button
                  onClick={() => handleLinkClick(() => onNavigate('crafting'))}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-xs font-rajdhani font-bold tracking-widest uppercase transition-colors cursor-pointer ${
                    activePage === 'crafting'
                      ? 'bg-orange-500/20 text-amber-300'
                      : 'text-[#d6cdc5] hover:bg-orange-500/15 hover:text-white'
                  }`}
                >
                  <Hammer className="w-4 h-4 text-orange-400" />
                  Crafting Guide
                </button>
                <button
                  onClick={() => handleLinkClick(() => onNavigate('droplist'))}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-xs font-rajdhani font-bold tracking-widest uppercase transition-colors cursor-pointer ${
                    activePage === 'droplist'
                      ? 'bg-orange-500/20 text-amber-300'
                      : 'text-[#d6cdc5] hover:bg-orange-500/15 hover:text-white'
                  }`}
                >
                  <Package className="w-4 h-4 text-orange-400" />
                  Drop List
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Right: GameCP Dropdown & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <div className="relative hidden sm:block" ref={gameCpRef}>
            <button
              onClick={() => setGameCpOpen((prev) => !prev)}
              aria-expanded={gameCpOpen}
              aria-haspopup="menu"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 via-orange-600 to-red-600 hover:from-amber-400 hover:via-orange-500 hover:to-red-500 text-white text-xs font-rajdhani font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(249,115,22,0.45)] hover:shadow-[0_0_28px_rgba(245,158,11,0.7)] transition-all cursor-pointer"
            >
              GAMECP
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${gameCpOpen ? 'rotate-180' : ''}`} />
            </button>

            {gameCpOpen && (
              <div
                role="menu"
                className="absolute right-0 mt-2 w-44 rounded-xl bg-[#160e0b]/95 backdrop-blur-xl border border-orange-500/30 shadow-[0_12px_40px_rgba(0,0,0,0.8)] py-2 overflow-hidden"
              >
                <a
                  href={process.env.NEXT_PUBLIC_GAMECP_LOGIN_URL}
                  role="menuitem"
                  className="block px-4 py-2.5 text-xs font-rajdhani font-bold tracking-widest uppercase text-[#d6cdc5] hover:bg-orange-500/15 hover:text-white"
                >
                  Login
                </a>
                <a
                  href={process.env.NEXT_PUBLIC_GAMECP_REGISTER_URL}
                  role="menuitem"
                  className="block px-4 py-2.5 text-xs font-rajdhani font-bold tracking-widest uppercase text-[#d6cdc5] hover:bg-orange-500/15 hover:text-white"
                >
                  Register
                </a>
              </div>
            )}
          </div>

          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden p-2.5 rounded-lg bg-[#1d120d] border border-orange-500/30 text-amber-200 hover:text-white cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0f0907] border-b border-orange-500/25 px-4 pt-2 pb-5 space-y-1">
          <button
            onClick={() => handleLinkClick(() => onNavigate('home'))}
            className="w-full text-left px-4 py-3 rounded-lg text-xs font-rajdhani font-bold tracking-widest uppercase text-[#faf6f0] hover:bg-orange-500/15"
          >
            Home
          </button>
          <button
            onClick={() => handleLinkClick(() => onScrollToSection('server'))}
            className="w-full text-left px-4 py-3 rounded-lg text-xs font-rajdhani font-bold tracking-widest uppercase text-[#faf6f0] hover:bg-orange-500/15"
          >
            Server
          </button>
          <button
            onClick={() => handleLinkClick(() => onScrollToSection('ranking'))}
            className="w-full text-left px-4 py-3 rounded-lg text-xs font-rajdhani font-bold tracking-widest uppercase text-[#faf6f0] hover:bg-orange-500/15"
          >
            Ranking
          </button>
          <button
            onClick={() => handleLinkClick(() => onNavigate('download'))}
            className="w-full text-left px-4 py-3 rounded-lg text-xs font-rajdhani font-bold tracking-widest uppercase text-[#faf6f0] hover:bg-orange-500/15"
          >
            Download
          </button>

          <div className="pt-2 pb-1 px-4 text-[10px] font-rajdhani font-bold tracking-widest uppercase text-amber-400">
            Game Info
          </div>
          <button
            onClick={() => handleLinkClick(() => onNavigate('crafting'))}
            className="w-full flex items-center gap-2.5 px-6 py-2.5 rounded-lg text-xs font-rajdhani font-bold tracking-widest uppercase text-[#d6cdc5] hover:bg-orange-500/15"
          >
            <Hammer className="w-4 h-4 text-orange-400" />
            Crafting Guide
          </button>
          <button
            onClick={() => handleLinkClick(() => onNavigate('droplist'))}
            className="w-full flex items-center gap-2.5 px-6 py-2.5 rounded-lg text-xs font-rajdhani font-bold tracking-widest uppercase text-[#d6cdc5] hover:bg-orange-500/15"
          >
            <Package className="w-4 h-4 text-orange-400" />
            Drop List
          </button>

          <div className="relative pt-3" ref={mobileGameCpRef}>
            <button
              onClick={() => setGameCpOpen((prev) => !prev)}
              aria-expanded={gameCpOpen}
              aria-haspopup="menu"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-amber-500 via-orange-600 to-red-600 text-white text-xs font-rajdhani font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(249,115,22,0.45)]"
            >
              GAMECP
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${gameCpOpen ? 'rotate-180' : ''}`} />
            </button>
            {gameCpOpen && (
              <div
                role="menu"
                className="mt-2 rounded-xl bg-[#160e0b] border border-orange-500/30 py-2"
              >
                <a
                  href={process.env.NEXT_PUBLIC_GAMECP_LOGIN_URL}
                  role="menuitem"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-2.5 text-xs font-rajdhani font-bold tracking-widest uppercase text-[#d6cdc5] hover:bg-orange-500/15 hover:text-white"
                >
                  Login
                </a>
                <a
                  href={process.env.NEXT_PUBLIC_GAMECP_REGISTER_URL}
                  role="menuitem"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-2.5 text-xs font-rajdhani font-bold tracking-widest uppercase text-[#d6cdc5] hover:bg-orange-500/15 hover:text-white"
                >
                  Register
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

const FooterSection = ({ onNavigate, onScrollToSection, onOpenRules }) => (
  <footer className="relative bg-[#060403]/70 pt-14 pb-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-orange-500/15">
        {/* Left Brand */}
        <div className="md:col-span-4 space-y-4">
          <ArchonsLogo size="footer" showText />
          <p className="text-sm text-[#a89f96] leading-relaxed max-w-sm">
            A Level 55 mid-rate PvP server bringing back old-style Rising Force Online, with PvP-ready items, Cash Points donations, and perks for guilds and streamers.
          </p>
        </div>

        {/* Middle Navigation Links */}
        <div className="md:col-span-2 space-y-3">
          <h4 className="font-cinzel text-xs font-bold tracking-widest uppercase text-amber-200">
            Navigation
          </h4>
          <ul className="space-y-2.5 text-sm text-[#a89f96]">
            <li>
              <button onClick={() => onNavigate('home')} className="hover:text-amber-400 transition-colors cursor-pointer">
                Home
              </button>
            </li>
            <li>
              <button onClick={() => onScrollToSection('server')} className="hover:text-amber-400 transition-colors cursor-pointer">
                Server Info
              </button>
            </li>
            <li>
              <button onClick={() => onScrollToSection('ranking')} className="hover:text-amber-400 transition-colors cursor-pointer">
                Rankings
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('download')} className="hover:text-amber-400 transition-colors cursor-pointer">
                Download Client
              </button>
            </li>
          </ul>
        </div>

        {/* Right Game Info */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="font-cinzel text-xs font-bold tracking-widest uppercase text-amber-200">
            Game Info
          </h4>
          <ul className="space-y-2.5 text-sm text-[#a89f96]">
            <li>
              <button onClick={() => onNavigate('crafting')} className="hover:text-amber-400 transition-colors cursor-pointer">
                Crafting Guide
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('droplist')} className="hover:text-amber-400 transition-colors cursor-pointer">
                Drop List Database
              </button>
            </li>
            <li>
              <button onClick={onOpenRules} className="hover:text-amber-400 transition-colors cursor-pointer">
                Server Rules & Fair Play
              </button>
            </li>
            <li>
              <button
                onClick={() => onNotify('Discord 24/7 GM Support portal opened!')}
                className="hover:text-amber-400 transition-colors cursor-pointer"
              >
                24/7 GM Support
              </button>
            </li>
          </ul>
        </div>

        {/* Community Links */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="font-cinzel text-xs font-bold tracking-widest uppercase text-amber-200">
            Community
          </h4>
          <ul className="space-y-2.5 text-sm text-[#a89f96]">
            <li>
              <a
                href="https://www.facebook.com/archonsofnovus/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-400 transition-colors"
              >
                Facebook
              </a>
            </li>
            <li>
              {DISCORD_URL ? (
                <a
                  href={DISCORD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition-colors"
                >
                  Discord
                </a>
              ) : (
                <span>Discord unavailable</span>
              )}
            </li>
            <li>
              <a
                href="https://www.archonsofnovus.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-400 transition-colors"
              >
                Website
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#786e65]">
        <p>© 2026 RF Archons of Novus. All rights reserved. Fan-operated private server.</p>
        <p className="font-rajdhani font-semibold tracking-widest text-[11px] text-amber-500/75">
          LEVEL 55 • MID-RATE PVP SERVER
        </p>
      </div>
    </div>
  </footer>
);

const ServerRulesModal = ({ open, onClose }) => {
  if (!open) return null;
  const rules = [
    'Zero tolerance for third-party cheats, speed hacks, fly hacks, or automated macro bots.',
    'Dual-login is strictly prohibited inside Crag Mine during Chip War hours.',
    'No bug exploiting, terrain glitching, or Pit Boss safe-spotting.',
    'Respect fellow warriors in global chat—fierce faction rivalry is encouraged, harassment is not.',
  ];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-[#160e0b] border border-orange-500/35 p-6 shadow-[0_0_50px_rgba(249,115,22,0.3)]">
        <div className="flex items-center justify-between pb-4 border-b border-orange-500/20">
          <div className="flex items-center gap-2.5">
            <Shield className="w-5 h-5 text-amber-400" />
            <h3 className="font-cinzel text-base font-bold tracking-wider uppercase text-white">
              RF Archons of Novus — Rules
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#a89f96] hover:text-white hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <ul className="py-5 space-y-3">
          {rules.map((rule, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-[#e5ddd5]">
              <span className="mt-0.5 w-5 h-5 rounded-full bg-orange-500/20 border border-amber-400/40 text-amber-300 text-xs font-rajdhani font-bold flex items-center justify-center shrink-0">
                {i + 1}
              </span>
              <span>{rule}</span>
            </li>
          ))}
        </ul>
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-amber-500 via-orange-600 to-red-600 text-white text-xs font-rajdhani font-bold tracking-widest uppercase cursor-pointer"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};

const ToastNotification = ({ message }) => {
  if (!message) return null;
  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-[#1d120d]/95 border border-amber-500/50 text-[#faf6f0] text-sm shadow-[0_0_28px_rgba(249,115,22,0.45)] animate-fade-in">
      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
      <span>{message}</span>
    </div>
  );
};

const BackgroundMusic = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    let active = true;
    audioRef.current.play().catch((error) => {
      if (active) {
        setMessage(error.name === 'NotAllowedError'
          ? 'Autoplay blocked. Click to play.'
          : 'Music could not be played.');
      }
    });
    return () => { active = false; };
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio.paused) {
      audio.pause();
      return;
    }
    audio.play().catch((error) => {
      setMessage(error.name === 'NotAllowedError'
        ? 'Playback blocked by your browser.'
        : 'Music could not be played.');
    });
  };

  return (
    <div className="fixed bottom-5 left-5 z-40 flex flex-col items-start gap-2">
      <audio
        ref={audioRef}
        src="/Music/ost.mp3"
        loop
        preload="auto"
        onPlay={() => { setIsPlaying(true); setMessage(''); }}
        onPause={() => setIsPlaying(false)}
        onError={() => setMessage('Music could not be loaded.')}
      />
      {message && (
        <span role="status" className="rounded-lg bg-[#160e0b]/95 border border-orange-500/30 px-3 py-2 text-xs text-amber-100">
          {message}
        </span>
      )}
      <button
        type="button"
        onClick={toggleMusic}
        className="inline-flex items-center gap-2 rounded-xl bg-[#160e0b]/95 border border-orange-500/30 px-4 py-3 text-xs font-rajdhani font-bold tracking-widest text-amber-100 hover:border-amber-400 transition-colors cursor-pointer"
      >
        {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        {isPlaying ? 'PAUSE MUSIC' : 'PLAY MUSIC'}
      </button>
    </div>
  );
};

// ============================================================================
// 5. HOME PAGE MODULAR SECTIONS
// ============================================================================

const HeroSection = ({ onNavigate }) => {
  return (
    <section className="hero-section relative flex flex-col overflow-hidden pb-0">
      {/* Volcanic Ember Ambient Glows */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 68% 58% at 50% 28%, rgba(249, 115, 22, 0.24), transparent 72%), radial-gradient(circle at 20% 45%, rgba(220, 38, 38, 0.16), transparent 48%), radial-gradient(circle at 80% 42%, rgba(245, 158, 11, 0.15), transparent 48%)',
        }}
      />

      {/* Volcanic Battlefield Silhouette Layer */}
      <svg
        viewBox="0 0 1440 520"
        className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="emberSilhouette" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ea580c" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#080504" stopOpacity="0.98" />
          </linearGradient>
        </defs>
        <path
          d="M50 520 L95 310 L145 250 L185 160 L250 185 L285 120 L330 165 L315 240 L370 280 L355 520 Z"
          fill="url(#emberSilhouette)"
        />
        <path
          d="M1070 520 L1105 330 L1145 260 L1170 210 L1200 250 L1225 320 L1265 245 L1305 180 L1340 215 L1375 340 L1405 520 Z"
          fill="url(#emberSilhouette)"
        />
        <line x1="0" y1="450" x2="1440" y2="450" stroke="#f97316" strokeWidth="1" strokeOpacity="0.35" />
      </svg>

      <div className="hero-embers" aria-hidden="true">
        {Array.from({ length: 28 }, (_, index) => (
          <span
            key={index}
            className="hero-ember"
            style={{
              left: `${(index * 37 + 5) % 100}%`,
              '--ember-size': `${2 + (index % 3)}px`,
              '--ember-drift': `${(index % 2 === 0 ? 1 : -1) * (15 + (index % 5) * 8)}px`,
              animationDuration: `${7 + (index % 6)}s`,
              animationDelay: `${-(index * 0.7)}s`,
            }}
          />
        ))}
      </div>

      {/* Centerpiece Content */}
      <div className="hero-content relative w-full max-w-5xl mx-auto px-4 sm:px-6 text-center pb-14 sm:pb-20 flex flex-1 flex-col items-center justify-center">
        <div className="hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/15 border border-amber-400/35 text-amber-300 text-[11px] font-rajdhani font-bold tracking-widest uppercase mb-5">
          <span className="w-2 h-2 rounded-full bg-red-400" />
          LEVEL 55 • MID-RATE PVP
        </div>

        {/* Prominent Centered Archons Logo */}
        <div className="hero-logo flex justify-center mb-3">
          <ArchonsLogo size="lg" />
        </div>

        <h1 className="hero-title font-cinzel font-black text-2xl sm:text-4xl md:text-5xl tracking-wider uppercase text-white">
          OLD-SCHOOL{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-red-500 drop-shadow-[0_0_20px_rgba(249,115,22,0.65)]">
            PVP RETURNS
          </span>
        </h1>

        <p className="hero-description mt-3 max-w-2xl mx-auto text-sm sm:text-base text-[#d6cdc5] leading-relaxed">
          A Level 55 mid-rate PvP server bringing back old-style Rising Force Online. High EXP and mining rates, mid drop and Animus rates, and a low sell rate.
        </p>

        {/* Dual CTAs */}
        <div className="hero-actions mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onNavigate('download')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-600 to-red-600 hover:from-amber-400 hover:via-orange-500 hover:to-red-500 text-white font-rajdhani text-sm font-bold tracking-widest uppercase shadow-[0_0_30px_rgba(249,115,22,0.55)] hover:shadow-[0_0_40px_rgba(245,158,11,0.75)] transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            DOWNLOAD CLIENT
          </button>
          {DISCORD_URL ? (
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#160e0b]/90 hover:bg-[#241610] border border-amber-500/40 text-amber-100 font-rajdhani text-sm font-bold tracking-widest uppercase transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-amber-400" />
              JOIN DISCORD
            </a>
          ) : (
            <button disabled className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#160e0b]/90 border border-amber-500/40 text-amber-100 font-rajdhani text-sm font-bold tracking-widest uppercase opacity-50 cursor-not-allowed">
              DISCORD UNAVAILABLE
            </button>
          )}
        </div>
      </div>

      {/* Bottom 4-Column Status Bar */}
      <div className="relative bg-[#0f0907]/95 backdrop-blur-md">
        <div className="hero-status-grid max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4">
          <div className="py-4 px-4 flex flex-col items-center text-center">
            <span className="text-[10px] font-rajdhani font-bold tracking-widest uppercase text-[#a89f96]">
              SERVER STATUS
            </span>
            <div className="mt-1 flex items-center gap-2 font-rajdhani text-base font-bold text-red-400">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400 shadow-[0_0_10px_#f87171]" />
              OFFLINE
            </div>
          </div>

          <div className="py-4 px-4 flex flex-col items-center text-center">
            <span className="text-[10px] font-rajdhani font-bold tracking-widest uppercase text-[#a89f96]">
              PLAYERS ONLINE
            </span>
            <div className="mt-1 font-rajdhani text-base font-bold text-[#faf6f0]">
              -
            </div>
          </div>

          <div className="py-4 px-4 flex flex-col items-center text-center">
            <span className="text-[10px] font-rajdhani font-bold tracking-widest uppercase text-[#a89f96]">
              NEXT CHIP WAR
            </span>
            <div className="mt-1 font-rajdhani text-base font-bold text-amber-300 tabular-nums">
              -
            </div>
          </div>

          <div className="py-4 px-4 flex flex-col items-center text-center">
            <span className="text-[10px] font-rajdhani font-bold tracking-widest uppercase text-[#a89f96]">
              SERVER TYPE
            </span>
            <div className="mt-1 font-rajdhani text-base font-bold text-[#faf6f0]">
              LEVEL 55 <span className="text-xs text-orange-400 font-semibold">MID-RATE PVP</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ServerInfoSection = ({ onNavigate, onOpenRules }) => (
  <section id="server" className="py-20 scroll-mt-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-rajdhani font-bold tracking-[0.3em] uppercase text-amber-400">
          SERVER SPECIFICATION
        </span>
        <h2 className="mt-2 font-cinzel text-2xl sm:text-4xl font-black tracking-wide uppercase text-white">
          LEVEL 55 - <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-500">MID-RATE PVP SERVER</span>
        </h2>
        <p className="mt-3 text-sm text-[#a89f96]">
          Old-school PvP, PvP-ready items, and familiar default concepts—without overpowered edited donations or MU-like lightning skins.
        </p>
      </div>

      {/* Server information cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {SERVER_RATES.map((stat) => (
          <div
            key={stat.label}
            className="cyber-card rounded-xl bg-[#160e0b] border border-orange-500/20 p-5 text-center hover:border-amber-400/50 hover:shadow-[0_0_24px_rgba(249,115,22,0.18)] transition-all"
          >
            <div className="font-cinzel text-2xl sm:text-3xl font-black text-[#faf6f0]">
              {stat.value}
            </div>
            <div className="mt-1 font-rajdhani text-xs font-bold tracking-widest uppercase text-amber-400">
              {stat.label}
            </div>
            <div className="mt-1 text-xs text-[#a89f96]">{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Server features and community perks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {SERVER_CHECKLIST.map((col) => (
          <div
            key={col.title}
            className="cyber-card rounded-xl bg-[#160e0b]/95 border border-orange-500/20 p-5"
          >
            <h3 className="font-cinzel text-xs font-bold tracking-widest uppercase text-amber-300 pb-3 mb-3 border-b border-orange-500/15">
              {col.title}
            </h3>
            <ul className="space-y-2.5">
              {col.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#d6cdc5]">
                  <Check className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Quick Action Pills */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => onNavigate('crafting')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1d120d] hover:bg-orange-500/20 border border-orange-500/30 hover:border-amber-400 text-xs font-rajdhani font-bold tracking-widest uppercase text-amber-100 transition-all cursor-pointer"
        >
          <Hammer className="w-3.5 h-3.5 text-amber-400" />
          Crafting Guide
        </button>
        <button
          onClick={() => onNavigate('droplist')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1d120d] hover:bg-orange-500/20 border border-orange-500/30 hover:border-amber-400 text-xs font-rajdhani font-bold tracking-widest uppercase text-amber-100 transition-all cursor-pointer"
        >
          <Package className="w-3.5 h-3.5 text-amber-400" />
          Drop List
        </button>
        <button
          onClick={() => onNavigate('download')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1d120d] hover:bg-orange-500/20 border border-orange-500/30 hover:border-amber-400 text-xs font-rajdhani font-bold tracking-widest uppercase text-amber-100 transition-all cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 text-amber-400" />
          Download Client
        </button>
        <button
          onClick={onOpenRules}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1d120d] hover:bg-orange-500/20 border border-orange-500/30 hover:border-amber-400 text-xs font-rajdhani font-bold tracking-widest uppercase text-amber-100 transition-all cursor-pointer"
        >
          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
          Server Rules
        </button>
      </div>
    </div>
  </section>
);

const NewsEventsSection = () => {
  const [filter, setFilter] = useState('ALL');
  const [expandedId, setExpandedId] = useState(1);

  const filters = ['ALL', 'NEWS', 'EVENTS', 'UPDATES'];
  const filteredNews =
    filter === 'ALL' ? NEWS_ITEMS : NEWS_ITEMS.filter((item) => item.category === filter);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-rajdhani font-bold tracking-[0.3em] uppercase text-amber-400">
              NOVUS DISPATCH
            </span>
            <h2 className="mt-1 font-cinzel text-2xl sm:text-3xl font-black tracking-wide uppercase text-white">
              NEWS & <span className="text-amber-400">EVENTS</span>
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {filters.map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-rajdhani font-bold tracking-widest uppercase transition-all cursor-pointer ${
                  filter === tab
                    ? 'bg-gradient-to-r from-amber-500 via-orange-600 to-red-600 text-white shadow-[0_0_16px_rgba(249,115,22,0.45)]'
                    : 'bg-[#160e0b] border border-orange-500/20 text-[#a89f96] hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filteredNews.map((item) => {
            const isOpen = expandedId === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setExpandedId(isOpen ? null : item.id)}
                className={`cyber-card ${isOpen ? 'cyber-card-active' : ''} rounded-xl bg-[#160e0b] border transition-all cursor-pointer ${
                  isOpen
                    ? 'border-amber-500/50 shadow-[0_0_24px_rgba(249,115,22,0.18)]'
                    : 'border-orange-500/20 hover:border-orange-400/40'
                }`}
              >
                <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-rajdhani font-bold tracking-widest uppercase bg-orange-500/20 text-amber-300 border border-amber-400/30">
                        {item.category}
                      </span>
                      <span className="text-xs text-[#8a7f76] font-rajdhani font-semibold">{item.date}</span>
                    </div>
                    <h3 className="font-cinzel text-sm sm:text-base font-bold text-[#faf6f0]">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#a89f96]">{item.summary}</p>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-orange-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-amber-300' : ''
                    }`}
                  />
                </div>
                {isOpen && (
                  <div className="px-5 pb-5 pt-3 border-t border-orange-500/15 text-xs sm:text-sm text-[#e5ddd5] whitespace-pre-line leading-relaxed bg-[#1d120d]/70 rounded-b-xl">
                    {item.details}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const ThreeRacesSection = () => {
  const [selection, setSelection] = useState({ id: 'bellato', delay: 1000 });
  const selectedRaceId = selection.id;
  const race = RACES_DATA[selectedRaceId];

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSelection(({ id }) => {
        const raceIds = Object.keys(RACES_DATA);
        return { id: raceIds[(raceIds.indexOf(id) + 1) % raceIds.length], delay: 1000 };
      });
    }, selection.delay);
    return () => window.clearTimeout(timer);
  }, [selection]);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-rajdhani font-bold tracking-[0.3em] uppercase text-amber-400">
            CHOOSE YOUR ALLEGIANCE
          </span>
          <h2 className="mt-2 font-cinzel text-2xl sm:text-4xl font-black tracking-wide uppercase text-white">
            THE THREE <span className="text-amber-400">RACES</span>
          </h2>
          <p className="mt-3 text-sm text-[#a89f96]">
            Three rival empires locked in an eternal struggle for the volcanic ore mines of Novus.
          </p>
        </div>

        {/* Race Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {Object.values(RACES_DATA).map((r) => {
            const active = r.id === selectedRaceId;
            return (
              <button
                key={r.id}
                onClick={() => setSelection({ id: r.id, delay: 4000 })}
                aria-pressed={active}
                className={`px-5 py-2.5 rounded-xl font-rajdhani text-xs sm:text-sm font-bold tracking-widest uppercase border transition-all cursor-pointer ${
                  active
                    ? 'bg-[#21140e] text-white shadow-[0_0_22px_rgba(249,115,22,0.3)]'
                    : 'bg-[#160e0b] border-orange-500/20 text-[#a89f96] hover:text-white'
                }`}
                style={active ? { borderColor: r.accent } : {}}
              >
                {r.tabLabel}
              </button>
            );
          })}
        </div>

        {/* Race Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span
              className={`inline-block px-3 py-1 rounded-full text-[11px] font-rajdhani font-bold tracking-widest uppercase border ${race.badgeClass}`}
            >
              {race.tagline}
            </span>
            <div>
              <h3 className="font-cinzel text-2xl sm:text-3xl font-black uppercase text-white">
                {race.name}
              </h3>
              <p className="mt-1 text-xs font-rajdhani font-semibold tracking-wider uppercase text-amber-400/90">
                Signature Arsenal: {race.signature}
              </p>
            </div>
            <p className="text-sm text-[#d6cdc5] leading-relaxed">{race.description}</p>

            <ul className="space-y-2.5 pt-1">
              {race.perks.map((perk) => (
                <li key={perk} className="flex items-center gap-2.5 text-sm text-[#faf6f0]">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: race.accent, boxShadow: `0 0 8px ${race.accent}` }}
                  />
                  {perk}
                </li>
              ))}
            </ul>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
              {race.stats.map((st) => (
                <div key={st.label} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-rajdhani font-bold tracking-wider">
                    <span className="text-[#a89f96]">{st.label}</span>
                    <span className="text-white">{st.value}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${st.value}%`,
                        backgroundColor: race.accent,
                        boxShadow: `0 0 10px ${race.accent}`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <RaceEmblemShowcase race={race} />
          </div>
        </div>
      </div>
    </section>
  );
};

const BuiltForWarSection = () => (
  <section className="py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-rajdhani font-bold tracking-[0.3em] uppercase text-amber-400">
          WHY RF ARCHONS OF NOVUS
        </span>
        <h2 className="mt-2 font-cinzel text-2xl sm:text-4xl font-black tracking-wide uppercase text-white">
          BUILT FOR <span className="text-amber-400">THE WAR</span>
        </h2>
        <p className="mt-3 text-sm text-[#a89f96]">
          Engineered by veteran Rising Force architects for long-term balance, low latency, and relentless Chip War action.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {WAR_FEATURES.map((feat) => (
          <div
            key={feat.title}
            className="cyber-card group rounded-xl bg-[#160e0b] border border-orange-500/20 p-6 hover:border-amber-400/50 hover:bg-[#1d120d] transition-all"
          >
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-amber-500/25 via-orange-600/25 to-red-600/25 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-[0_0_16px_rgba(249,115,22,0.3)] mb-5 group-hover:scale-105 transition-transform">
              <feat.icon className="w-5 h-5" />
            </div>
            <h3 className="font-cinzel text-sm font-bold tracking-wider uppercase text-white mb-2">
              {feat.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#a89f96] leading-relaxed">{feat.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ActiveGuildsSection = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedGuilds = showAll ? GUILDS_DATA : GUILDS_DATA.slice(0, 8);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-rajdhani font-bold tracking-[0.3em] uppercase text-amber-400">
              ELITE FACTIONS
            </span>
            <h2 className="mt-1 font-cinzel text-2xl sm:text-4xl font-black tracking-wide uppercase text-white">
              ACTIVE <span className="text-amber-400">GUILDS</span>
            </h2>
          </div>
          <div className="text-xs font-rajdhani font-bold tracking-widest text-emerald-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {GUILDS_DATA.length} REGISTERED WAR GUILDS
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {displayedGuilds.map((guild) => (
            <div
              key={guild.id}
              className="cyber-card rounded-xl bg-[#160e0b] border border-orange-500/20 p-5 text-center hover:border-amber-400/50 hover:shadow-[0_0_24px_rgba(249,115,22,0.2)] transition-all"
            >
              <GuildCrestSVG type={guild.emblemType} race={guild.race} />
              <h3 className="mt-4 font-cinzel text-xs sm:text-sm font-bold tracking-wider uppercase text-white truncate">
                {guild.name}
              </h3>
              <div className="mt-2 flex items-center justify-center gap-2">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-rajdhani font-bold uppercase ${
                    guild.race === 'Bellato'
                      ? 'bg-amber-500/15 text-amber-300 border border-amber-400/30'
                      : guild.race === 'Cora'
                      ? 'bg-orange-500/15 text-orange-300 border border-orange-400/30'
                      : 'bg-red-500/15 text-red-300 border border-red-400/30'
                  }`}
                >
                  {guild.race}
                </span>
                <span className="text-[11px] text-[#a89f96] flex items-center gap-1">
                  <Users className="w-3 h-3 text-amber-400" /> {guild.members}/50
                </span>
              </div>
              <div className="mt-3 pt-3 border-t border-orange-500/15 text-[11px] text-[#a89f96]">
                Leader: <span className="text-amber-200 font-semibold">{guild.leader}</span>
              </div>
            </div>
          ))}
        </div>

        {GUILDS_DATA.length === 0 && (
          <div className="text-center py-12 rounded-2xl bg-[#160e0b] border border-orange-500/20 text-[#a89f96] text-sm">
            No guild data available.
          </div>
        )}

        {GUILDS_DATA.length > 0 && <div className="mt-8 text-center">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-orange-600 to-red-600 hover:from-amber-400 hover:via-orange-500 hover:to-red-500 text-white font-rajdhani text-xs font-bold tracking-widest uppercase shadow-[0_0_22px_rgba(249,115,22,0.45)] transition-all cursor-pointer"
          >
            {showAll ? 'SHOW FEWER GUILDS' : 'VIEW MORE'}
          </button>
        </div>}
      </div>
    </section>
  );
};

const PartneredStreamersSection = ({ onNotify }) => {
  const [page, setPage] = useState(1);
  const perPage = 10;
  const totalPages = Math.max(1, Math.ceil(STREAMERS_DATA.length / perPage));
  const currentStreamers = STREAMERS_DATA.slice((page - 1) * perPage, page * perPage);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-rajdhani font-bold tracking-[0.3em] uppercase text-amber-400">
              CREATOR PROGRAM
            </span>
            <h2 className="mt-1 font-cinzel text-2xl sm:text-4xl font-black tracking-wide uppercase text-white">
              PARTNERED <span className="text-amber-400">STREAMERS</span>
            </h2>
          </div>
          <button
            onClick={() => onNotify('Streamer Partner application form opened!')}
            className="self-start sm:self-auto px-4 py-2 rounded-lg bg-[#1d120d] border border-orange-500/30 hover:border-amber-400 text-xs font-rajdhani font-bold tracking-widest uppercase text-amber-200 transition-colors cursor-pointer"
          >
            Apply as Partner
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {currentStreamers.map((streamer) => (
            <div
              key={streamer.id}
              onClick={() => onNotify(`Opening ${streamer.name}'s ${streamer.platform} channel...`)}
              className="cyber-card group relative rounded-xl bg-[#160e0b] border border-orange-500/20 overflow-hidden hover:border-amber-400/60 transition-all cursor-pointer"
            >
              <div className={`relative h-28 bg-gradient-to-br ${streamer.color} flex items-center justify-center`}>
                <div className="w-14 h-14 rounded-full bg-black/50 border-2 border-amber-200/35 flex items-center justify-center font-cinzel text-lg font-black text-white shadow-lg group-hover:scale-110 transition-transform">
                  {streamer.initials}
                </div>

                {streamer.live ? (
                  <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-rajdhani font-bold tracking-wider shadow-[0_0_12px_rgba(220,38,38,0.85)]">
                    <Radio className="w-3 h-3 animate-pulse" />
                    LIVE
                  </span>
                ) : (
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/65 text-[#a89f96] text-[10px] font-rajdhani font-bold">
                    OFFLINE
                  </span>
                )}

                <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-black/55 backdrop-blur-sm text-[10px] text-amber-100 font-semibold">
                  {streamer.platform}
                </span>
              </div>

              <div className="p-3.5 text-center">
                <div className="font-rajdhani text-sm font-bold text-white truncate">
                  {streamer.name}
                </div>
                <div className="mt-1 flex items-center justify-center gap-2 text-[11px] text-[#a89f96]">
                  <span>{streamer.race}</span>
                  <span>•</span>
                  <span className={streamer.live ? 'text-amber-300 font-semibold' : 'text-[#786e65]'}>
                    {streamer.live ? `${streamer.viewers} watching` : 'Offline'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {STREAMERS_DATA.length === 0 && (
          <div className="text-center py-12 rounded-2xl bg-[#160e0b] border border-orange-500/20 text-[#a89f96] text-sm">
            No streamer data available.
          </div>
        )}

        {/* Pagination */}
        {STREAMERS_DATA.length > 0 && <div className="mt-8 flex items-center justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-2 rounded-lg bg-[#160e0b] border border-orange-500/25 text-[#d6cdc5] disabled:opacity-40 hover:border-amber-400 cursor-pointer disabled:cursor-not-allowed"
            aria-label="Previous Page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          {[...Array(totalPages)].map((_, idx) => {
            const pNum = idx + 1;
            return (
              <button
                key={pNum}
                onClick={() => setPage(pNum)}
                className={`w-9 h-9 rounded-lg font-rajdhani text-xs font-bold transition-all cursor-pointer ${
                  page === pNum
                    ? 'bg-gradient-to-r from-amber-500 via-orange-600 to-red-600 text-white shadow-[0_0_16px_rgba(249,115,22,0.5)]'
                    : 'bg-[#160e0b] border border-orange-500/20 text-[#a89f96] hover:text-white'
                }`}
              >
                {pNum}
              </button>
            );
          })}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="p-2 rounded-lg bg-[#160e0b] border border-orange-500/25 text-[#d6cdc5] disabled:opacity-40 hover:border-amber-400 cursor-pointer disabled:cursor-not-allowed"
            aria-label="Next Page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>}
      </div>
    </section>
  );
};

const RankingsSection = () => {
  const [boardTab, setBoardTab] = useState('PLAYERS');
  const [raceFilter, setRaceFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const boardTabs = [
    { id: 'PLAYERS', label: 'Top Players' },
    { id: 'GUILDS', label: 'Top Guilds' },
    { id: 'PVP', label: 'PvP Points' },
    { id: 'ARCHONS', label: 'Archons / Council' },
  ];

  const getRankBadge = (rank) => {
    if (rank === 1)
      return (
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-amber-400/20 border border-amber-400/60 text-amber-300 font-rajdhani text-xs font-black shadow-[0_0_12px_rgba(251,191,36,0.4)]">
          #1
        </span>
      );
    if (rank === 2)
      return (
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-stone-300/20 border border-stone-300/50 text-stone-200 font-rajdhani text-xs font-black">
          #2
        </span>
      );
    if (rank === 3)
      return (
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-orange-500/20 border border-orange-400/50 text-orange-300 font-rajdhani text-xs font-black">
          #3
        </span>
      );
    return <span className="font-rajdhani text-xs font-bold text-[#a89f96] pl-2">#{rank}</span>;
  };

  const getRaceDot = (race) => (
    <span
      className={`w-2.5 h-2.5 rounded-full shrink-0 ${
        race === 'Bellato'
          ? 'bg-amber-400 shadow-[0_0_8px_#fbbf24]'
          : race === 'Cora'
          ? 'bg-orange-500 shadow-[0_0_8px_#f97316]'
          : 'bg-red-500 shadow-[0_0_8px_#ef4444]'
      }`}
    />
  );

  const filteredRows = useMemo(() => {
    const q = searchQuery.toLowerCase();
    const matchRace = (r) => raceFilter === 'ALL' || r.toUpperCase() === raceFilter;

    if (boardTab === 'GUILDS') {
      return TOP_GUILDS_RANKING.filter(
        (g) =>
          matchRace(g.race) &&
          (g.name.toLowerCase().includes(q) || g.leader.toLowerCase().includes(q))
      );
    }
    if (boardTab === 'ARCHONS') {
      return ARCHONS_COUNCIL_DATA.filter(
        (a) =>
          matchRace(a.race) &&
          (a.name.toLowerCase().includes(q) ||
            a.role.toLowerCase().includes(q) ||
            a.guild.toLowerCase().includes(q))
      );
    }
    const base =
      boardTab === 'PVP'
        ? [...TOP_PLAYERS_DATA].sort((a, b) => b.pvp - a.pvp)
        : TOP_PLAYERS_DATA;
    return base.filter(
      (p) =>
        matchRace(p.race) &&
        (p.name.toLowerCase().includes(q) ||
          p.guild.toLowerCase().includes(q) ||
          p.className.toLowerCase().includes(q))
    );
  }, [boardTab, raceFilter, searchQuery]);

  const hasRankingData = (
    boardTab === 'GUILDS' ? TOP_GUILDS_RANKING :
    boardTab === 'ARCHONS' ? ARCHONS_COUNCIL_DATA :
    TOP_PLAYERS_DATA
  ).length > 0;

  return (
    <section id="ranking" className="py-20 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-xs font-rajdhani font-bold tracking-[0.3em] uppercase text-amber-400">
            HALL OF ARCHONS
          </span>
          <h2 className="mt-2 font-cinzel text-2xl sm:text-4xl font-black tracking-wide uppercase text-white">
            SERVER <span className="text-amber-400">RANKINGS</span>
          </h2>
        </div>

        {/* Leaderboard Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          {boardTabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setBoardTab(t.id)}
              className={`px-4 py-2 rounded-xl text-xs font-rajdhani font-bold tracking-widest uppercase transition-all cursor-pointer ${
                boardTab === t.id
                  ? 'bg-gradient-to-r from-amber-500 via-orange-600 to-red-600 text-white shadow-[0_0_18px_rgba(249,115,22,0.45)]'
                  : 'bg-[#160e0b] border border-orange-500/20 text-[#a89f96] hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Race Filter + Search Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {['ALL', 'BELLATO', 'CORA', 'ACCRETIA'].map((tab) => (
              <button
                key={tab}
                onClick={() => setRaceFilter(tab)}
                className={`px-3.5 py-1.5 rounded-full text-[11px] font-rajdhani font-bold tracking-widest uppercase transition-all cursor-pointer ${
                  raceFilter === tab
                    ? 'bg-orange-500/25 border border-amber-400 text-amber-200'
                    : 'bg-[#160e0b] border border-orange-500/20 text-[#a89f96] hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search character or guild..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#160e0b] border border-orange-500/25 text-xs text-white placeholder-[#786e65] focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="cyber-card rounded-2xl bg-[#160e0b]/95 border border-orange-500/25 overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.6)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-orange-500/20 bg-[#1d120d] text-[11px] font-rajdhani font-bold tracking-widest uppercase text-amber-300">
                  <th className="py-3.5 px-4">Rank</th>
                  <th className="py-3.5 px-4">{boardTab === 'GUILDS' ? 'Guild' : 'Warrior'}</th>
                  <th className="py-3.5 px-4">
                    {boardTab === 'GUILDS'
                      ? 'Leader'
                      : boardTab === 'ARCHONS'
                      ? 'Council Position'
                      : 'Class'}
                  </th>
                  <th className="py-3.5 px-4 text-center">
                    {boardTab === 'GUILDS' ? 'Members' : 'Lv.'}
                  </th>
                  <th className="py-3.5 px-4 text-right">
                    {boardTab === 'GUILDS'
                      ? 'Guild Points'
                      : boardTab === 'PVP'
                      ? 'PvP Points'
                      : 'CPT Points'}
                  </th>
                  <th className="py-3.5 px-4">{boardTab === 'GUILDS' ? 'Grade' : 'Guild'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-orange-500/10 text-sm">
                {filteredRows.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-10 text-center text-[#a89f96] text-xs">
                      {hasRankingData ? 'No entries match your current filter.' : 'No ranking data available.'}
                    </td>
                  </tr>
                ) : (
                  filteredRows.map((row, idx) => (
                    <tr key={row.name} className="hover:bg-orange-500/10 transition-colors">
                      <td className="py-3.5 px-4">{getRankBadge(idx + 1)}</td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          {getRaceDot(row.race)}
                          <span className="font-semibold text-[#faf6f0]">{row.name}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-xs text-[#d6cdc5]">
                        {boardTab === 'GUILDS'
                          ? row.leader
                          : boardTab === 'ARCHONS'
                          ? row.role
                          : row.className}
                      </td>
                      <td className="py-3.5 px-4 text-center font-rajdhani text-xs font-bold text-amber-200">
                        {boardTab === 'GUILDS' ? `${row.members}/50` : row.level}
                      </td>
                      <td className="py-3.5 px-4 text-right font-rajdhani text-sm font-bold text-amber-400">
                        {boardTab === 'GUILDS'
                          ? row.points.toLocaleString()
                          : boardTab === 'PVP'
                          ? row.pvp.toLocaleString()
                          : row.cpt.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 text-xs text-[#a89f96] font-medium">
                        {boardTab === 'GUILDS' ? row.grade : row.guild}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

const JoinCtaBannerSection = ({ onNavigate }) => (
  <section className="py-20">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#26120a] via-[#160e0b] to-[#0d0705] p-8 sm:p-12 shadow-[0_0_50px_rgba(249,115,22,0.22)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <h2 className="font-cinzel text-3xl sm:text-4xl font-black tracking-wide uppercase text-white leading-tight">
              YOUR RACE NEEDS <span className="text-amber-400">YOU</span>
            </h2>
            <p className="text-sm text-[#d6cdc5] max-w-lg">
              Enlist in RF Archons of Novus today and claim your Free OBT Starter Pack upon reaching Level 30. The fires of Crag Mine are burning.
            </p>
            <ul className="space-y-2.5 text-sm text-[#faf6f0]">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                Instant Account Registration & Zero Paywall
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                Free 7-Day Premium Service & Starter Booster
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                Active Guild Recruitment & 3x Daily Chip Wars
              </li>
            </ul>
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => onNavigate('download')}
                className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-600 to-red-600 hover:from-amber-400 hover:via-orange-500 hover:to-red-500 text-white font-rajdhani text-xs sm:text-sm font-bold tracking-widest uppercase shadow-[0_0_24px_rgba(249,115,22,0.5)] transition-all cursor-pointer"
              >
                DOWNLOAD NOW
              </button>
              <a
                href={process.env.NEXT_PUBLIC_GAMECP_REGISTER_URL}
                className="px-7 py-3.5 rounded-xl bg-[#0f0907] hover:bg-[#1f130d] border border-amber-500/40 text-amber-100 font-rajdhani text-xs sm:text-sm font-bold tracking-widest uppercase text-center transition-all cursor-pointer"
              >
                REGISTER ACCOUNT
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <Image src={raceImage} alt="Warriors from the three races" className="w-full h-auto" sizes="(max-width: 1023px) 100vw, 40vw" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const HomePage = ({ onNavigate, onOpenRules, onNotify }) => (
  <div>
    <HeroSection onNavigate={onNavigate} />
    <ServerInfoSection onNavigate={onNavigate} onOpenRules={onOpenRules} />
    <NewsEventsSection />
    <ThreeRacesSection />
    <BuiltForWarSection />
    <ActiveGuildsSection />
    <PartneredStreamersSection onNotify={onNotify} />
    <RankingsSection />
    <JoinCtaBannerSection onNavigate={onNavigate} />
  </div>
);

// ============================================================================
// 6. PAGE 2: DOWNLOAD PAGE
// ============================================================================

const DownloadPage = ({ onNotify }) => (
  <div className="py-12 sm:py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 scroll-reveal-stack">
      <div className="rounded-2xl bg-gradient-to-r from-[#24120a] via-[#160e0b] to-[#201009] border border-orange-500/30 p-8 sm:p-10 text-center">
        <span className="text-xs font-rajdhani font-bold tracking-[0.3em] uppercase text-amber-400">
          OFFICIAL GAME CLIENT
        </span>
        <h1 className="mt-2 font-cinzel text-3xl sm:text-5xl font-black tracking-wide uppercase text-white">
          DOWNLOAD <span className="text-amber-400">CLIENT</span>
        </h1>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs font-rajdhani font-bold text-[#d6cdc5]">
          <span className="px-3 py-1 rounded-full bg-orange-500/15 border border-orange-400/30 text-amber-200">
            Version v2.2.3.2 Full Client
          </span>
          <span className="px-3 py-1 rounded-full bg-orange-500/15 border border-orange-400/30 text-amber-200">
            Size: 2.45 GB
          </span>
          <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300">
            Updated: Nov 19, 2026
          </span>
        </div>
      </div>

      {/* Full Client Mirrors */}
      <div>
        <h2 className="font-cinzel text-lg sm:text-xl font-bold tracking-wider uppercase text-white mb-5 flex items-center gap-2.5">
          <Download className="w-5 h-5 text-amber-400" />
          Full Client Mirrors
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DOWNLOAD_MIRRORS.map((mirror) => (
            <div
              key={mirror.id}
              className="cyber-card rounded-xl bg-[#160e0b] border border-orange-500/25 p-5 flex flex-col justify-between hover:border-amber-400/60 hover:shadow-[0_0_25px_rgba(249,115,22,0.2)] transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-rajdhani font-bold bg-orange-500/20 text-amber-300 border border-amber-400/30">
                    {mirror.badge}
                  </span>
                  <span className="text-xs font-rajdhani font-bold text-[#a89f96]">{mirror.size}</span>
                </div>
                <h3 className="font-cinzel text-base font-bold text-white">{mirror.name}</h3>
                <p className="mt-1 text-xs text-[#a89f96]">{mirror.speed} • {mirror.version}</p>
                <div className="mt-3 space-y-1.5 text-[11px] font-mono bg-black/35 px-2.5 py-2 rounded border border-orange-500/15">
                  <div className="text-amber-200/90 truncate">{mirror.file}</div>
                  <div className="text-[#8a7f76] flex items-center justify-between gap-1">
                    <span className="truncate">SHA-256: {mirror.sha256}</span>
                    <button
                      onClick={() => onNotify(`Copied SHA-256 checksum for ${mirror.name}`)}
                      className="text-amber-400 hover:text-amber-300 cursor-pointer shrink-0"
                      title="Copy Checksum"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
              {DOWNLOADS_ENABLED && mirror.url ? (
                <a
                  href={mirror.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-5 w-full py-2.5 rounded-lg bg-gradient-to-r ${mirror.accent} hover:brightness-110 text-white font-rajdhani text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-all`}
                >
                  <FileDown className="w-4 h-4" />
                  Download
                </a>
              ) : (
                <button
                  disabled
                  className={`mt-5 w-full py-2.5 rounded-lg bg-gradient-to-r ${mirror.accent} text-white font-rajdhani text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 opacity-50 cursor-not-allowed`}
                >
                  <FileDown className="w-4 h-4" />
                  {DOWNLOADS_ENABLED ? 'Link unavailable' : 'Coming soon'}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* System Requirements */}
      <div>
        <h2 className="font-cinzel text-lg sm:text-xl font-bold tracking-wider uppercase text-white mb-5 flex items-center gap-2.5">
          <Monitor className="w-5 h-5 text-amber-400" />
          System Requirements
        </h2>
        <div className="cyber-card rounded-2xl bg-[#160e0b] border border-orange-500/25 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#1d120d] border-b border-orange-500/20 text-xs font-rajdhani font-bold tracking-widest uppercase text-amber-300">
                  <th className="py-3.5 px-5">Component</th>
                  <th className="py-3.5 px-5">Minimum Specs</th>
                  <th className="py-3.5 px-5 text-orange-300">Recommended Specs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-orange-500/10 text-xs sm:text-sm">
                {SYSTEM_REQUIREMENTS.map((row) => (
                  <tr key={row.spec} className="hover:bg-orange-500/5">
                    <td className="py-3.5 px-5 font-rajdhani font-bold text-white">{row.spec}</td>
                    <td className="py-3.5 px-5 text-[#a89f96]">{row.min}</td>
                    <td className="py-3.5 px-5 text-amber-100 font-medium">{row.rec}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 4-Step Installation Guide */}
      <div>
        <h2 className="font-cinzel text-lg sm:text-xl font-bold tracking-wider uppercase text-white mb-5 flex items-center gap-2.5">
          <HelpCircle className="w-5 h-5 text-amber-400" />
          4-Step Installation Guide
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {INSTALL_STEPS.map((item) => (
            <div
              key={item.step}
              className="cyber-card rounded-xl bg-[#160e0b] border border-orange-500/20 p-5 space-y-3"
            >
              <div className="font-cinzel text-2xl font-black text-amber-400/90">
                {item.step}
              </div>
              <h3 className="font-cinzel text-xs sm:text-sm font-bold uppercase text-white">
                {item.title}
              </h3>
              <p className="text-xs text-[#a89f96] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// ============================================================================
// 7. PAGE 3: CRAFTING GUIDE PAGE
// ============================================================================

const CraftingGuidePage = () => {
  const [category, setCategory] = useState('ALL');
  const [search, setSearch] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(CRAFTING_RECIPES[0]?.id ?? null);

  const categories = ['ALL', ...new Set(CRAFTING_RECIPES.map((recipe) => recipe.category))];

  const filteredRecipes = useMemo(() => {
    return CRAFTING_RECIPES.filter((r) => {
      const matchCat = category === 'ALL' || r.category === category;
      const matchSearch =
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.materials.some((m) => m.item.toLowerCase().includes(search.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [category, search]);

  const getRarityStyle = (rarity) => {
    switch (rarity) {
      case 'RELIC':
        return 'bg-red-500/20 text-red-300 border-red-400/50';
      case 'TYPE-C':
        return 'bg-orange-500/20 text-orange-300 border-orange-400/50';
      case 'INTENSE':
        return 'bg-amber-500/20 text-amber-200 border-amber-400/45';
      case 'CONSUMABLE':
        return 'bg-emerald-500/15 text-emerald-300 border-emerald-400/40';
      default:
        return 'bg-orange-500/15 text-amber-200 border-orange-400/35';
    }
  };

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 scroll-reveal-stack">
        <div className="rounded-2xl bg-gradient-to-r from-[#24120a] via-[#160e0b] to-[#201009] border border-orange-500/30 p-8 sm:p-10 text-center">
          <span className="text-xs font-rajdhani font-bold tracking-[0.3em] uppercase text-amber-400">
            GAME INFO • COMBINATION FORGE
          </span>
          <h1 className="mt-2 font-cinzel text-3xl sm:text-5xl font-black tracking-wide uppercase text-white">
            CRAFTING <span className="text-amber-400">GUIDE</span>
          </h1>
          <p className="mt-3 text-sm text-[#a89f96] max-w-2xl mx-auto">
            Master Hero NPC combinations, Type-C Excelsiar formulas, Relic unsealing, Talic upgrades, and Specialist ammo & potion crafting.
          </p>

          <div className="mt-6 max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-amber-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search recipe or material (e.g. Excelsiar, Shield, Potion)..."
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#0c0705] border border-orange-500/30 text-xs sm:text-sm text-white placeholder-[#786e65] focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3.5 py-2 rounded-lg text-xs font-rajdhani font-bold tracking-widest uppercase transition-all cursor-pointer ${
                category === cat
                  ? 'bg-gradient-to-r from-amber-500 via-orange-600 to-red-600 text-white shadow-[0_0_16px_rgba(249,115,22,0.5)]'
                  : 'bg-[#160e0b] border border-orange-500/20 text-[#a89f96] hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Recipe Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredRecipes.map((recipe) => {
            const isExpanded = selectedRecipe === recipe.id;
            return (
              <div
                key={recipe.id}
                onClick={() => setSelectedRecipe(isExpanded ? null : recipe.id)}
                className={`cyber-card ${isExpanded ? 'cyber-card-active' : ''} rounded-2xl bg-[#160e0b] border p-6 transition-all cursor-pointer ${
                  isExpanded
                    ? 'border-amber-400/60 shadow-[0_0_30px_rgba(249,115,22,0.22)]'
                    : 'border-orange-500/20 hover:border-orange-400/45'
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3 pb-4 border-b border-orange-500/15">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span
                        className={`px-2.5 py-0.5 rounded text-[10px] font-rajdhani font-bold uppercase border ${getRarityStyle(
                          recipe.rarity
                        )}`}
                      >
                        {recipe.rarity}
                      </span>
                      <span className="text-[11px] text-[#a89f96]">{recipe.race}</span>
                    </div>
                    <h3 className="font-cinzel text-base font-bold text-white">{recipe.name}</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-rajdhani font-bold tracking-wider text-[#a89f96] uppercase">
                      Success Rate
                    </div>
                    <div className="font-rajdhani text-lg font-black text-emerald-400">
                      {recipe.successRate}
                    </div>
                  </div>
                </div>

                <div className="py-3 flex items-center justify-between text-xs text-amber-300">
                  <span className="flex items-center gap-1.5">
                    {recipe.category === 'POTION / AMMO' ? (
                      <FlaskConical className="w-3.5 h-3.5 text-orange-400" />
                    ) : (
                      <Hammer className="w-3.5 h-3.5 text-orange-400" />
                    )}
                    {recipe.npc}
                  </span>
                  <span className="text-[11px] text-[#a89f96] flex items-center gap-1">
                    {isExpanded ? 'Hide Tips' : 'Click for Tips'}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    />
                  </span>
                </div>

                <div className="space-y-2 pt-1">
                  {recipe.materials.map((mat) => (
                    <div
                      key={mat.item}
                      className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#1d120d]/90 border border-orange-500/15 text-xs"
                    >
                      <span className="text-[#e5ddd5]">{mat.item}</span>
                      <span className="font-rajdhani font-bold text-amber-300">{mat.qty}</span>
                    </div>
                  ))}
                </div>

                {isExpanded && (
                  <div className="mt-4 p-4 rounded-xl bg-orange-500/10 border border-amber-500/30 text-xs text-amber-100 leading-relaxed flex items-start gap-2.5">
                    <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-rajdhani font-bold uppercase text-amber-300 block mb-1">
                        Pro Crafting Tip
                      </span>
                      {recipe.tips}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredRecipes.length === 0 && (
          <div className="text-center py-12 rounded-2xl bg-[#160e0b] border border-orange-500/20 text-[#a89f96] text-sm">
            No crafting recipes found matching &quot;{search}&quot;.
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// 8. PAGE 4: DROP LIST PAGE
// ============================================================================

const DropListPage = () => {
  const [search, setSearch] = useState('');
  const [zone, setZone] = useState('ALL ZONES');
  const [pitBossOnly, setPitBossOnly] = useState(false);

  const zones = ['ALL ZONES', ...new Set(DROP_LIST_DATA.map((entry) => entry.zone))];

  const filteredDrops = useMemo(() => {
    return DROP_LIST_DATA.filter((entry) => {
      const matchZone = zone === 'ALL ZONES' || entry.zone === zone;
      const matchPitBoss = !pitBossOnly || entry.type === 'PIT BOSS';
      const q = search.toLowerCase();
      const matchSearch =
        entry.monster.toLowerCase().includes(q) ||
        entry.zone.toLowerCase().includes(q) ||
        entry.drops.some((d) => d.name.toLowerCase().includes(q));
      return matchZone && matchPitBoss && matchSearch;
    });
  }, [search, zone, pitBossOnly]);

  const getDropPillStyle = (tier) => {
    switch (tier) {
      case 'intense':
        return 'bg-orange-500/20 text-amber-200 border-amber-400/50';
      case 'talic':
        return 'bg-red-500/15 text-red-200 border-red-400/45';
      case 'currency':
        return 'bg-yellow-500/15 text-yellow-200 border-yellow-400/45';
      default:
        return 'bg-white/10 text-[#e5ddd5] border-white/20';
    }
  };

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-reveal-stack">
        <div className="rounded-2xl bg-gradient-to-r from-[#24120a] via-[#160e0b] to-[#201009] border border-orange-500/30 p-8 sm:p-10 text-center">
          <span className="text-xs font-rajdhani font-bold tracking-[0.3em] uppercase text-amber-400">
            GAME INFO • MONSTER & PIT BOSS LOOT
          </span>
          <h1 className="mt-2 font-cinzel text-3xl sm:text-5xl font-black tracking-wide uppercase text-white">
            DROP <span className="text-amber-400">LIST</span>
          </h1>
          <p className="mt-3 text-sm text-[#a89f96] max-w-2xl mx-auto">
            Search by monster name, zone, or item (Relic, Leon, Excelsiar, Elemental, Talic) to plan your farming routes across Novus.
          </p>

          <div className="mt-6 max-w-2xl mx-auto flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-amber-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search monster or item (e.g. Dagnu, Relic, Excelsiar)..."
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#0c0705] border border-orange-500/30 text-xs sm:text-sm text-white placeholder-[#786e65] focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Pit Boss Toggle */}
            <button
              onClick={() => setPitBossOnly((prev) => !prev)}
              className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-rajdhani text-xs font-bold tracking-widest uppercase border transition-all cursor-pointer ${
                pitBossOnly
                  ? 'bg-gradient-to-r from-red-600 to-orange-600 border-amber-400 text-white shadow-[0_0_18px_rgba(220,38,38,0.5)]'
                  : 'bg-[#0c0705] border-orange-500/30 text-[#d6cdc5] hover:border-amber-400'
              }`}
            >
              <Skull className="w-4 h-4" />
              Pit Boss Only: {pitBossOnly ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>

        {/* Zone Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {zones.map((z) => (
            <button
              key={z}
              onClick={() => setZone(z)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-rajdhani font-bold tracking-widest uppercase transition-all cursor-pointer ${
                zone === z
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-[0_0_15px_rgba(249,115,22,0.5)]'
                  : 'bg-[#160e0b] border border-orange-500/20 text-[#a89f96] hover:text-white'
              }`}
            >
              {z}
            </button>
          ))}
        </div>

        {/* Color Legend */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[#a89f96]">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Intense / Relic / Leon
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400" /> Talics / Runes / Gems
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-300" /> Accessories / Currency
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-stone-300" /> Materials
          </span>
        </div>

        {/* Drop Cards */}
        <div className="space-y-3">
          {filteredDrops.map((entry) => (
            <div
              key={entry.id}
              className={`cyber-card rounded-2xl bg-[#160e0b] border p-5 transition-all ${
                entry.type === 'PIT BOSS'
                  ? 'border-red-500/40 hover:border-amber-400/60 shadow-[0_0_24px_rgba(220,38,38,0.12)]'
                  : 'border-orange-500/20 hover:border-orange-400/45'
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                <div className="lg:col-span-4 space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-rajdhani font-bold uppercase ${
                        entry.type === 'PIT BOSS'
                          ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-[0_0_12px_rgba(220,38,38,0.55)]'
                          : entry.type === 'ELITE'
                          ? 'bg-orange-500/25 text-amber-300 border border-amber-400/40'
                          : 'bg-stone-700/60 text-stone-300'
                      }`}
                    >
                      {entry.type}
                    </span>
                    <span className="text-xs font-rajdhani font-bold text-[#a89f96]">Lv. {entry.level}</span>
                    <span className="text-xs text-[#8a7f76] flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400" /> {entry.respawn}
                    </span>
                  </div>
                  <h3 className="font-cinzel text-sm sm:text-base font-bold text-white">
                    {entry.monster}
                  </h3>
                  <div className="text-xs text-amber-300/85 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-orange-400" />
                    {entry.zone}
                  </div>
                </div>

                <div className="lg:col-span-8 flex flex-wrap gap-2">
                  {entry.drops.map((drop) => (
                    <div
                      key={drop.name}
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs ${getDropPillStyle(
                        drop.tier
                      )}`}
                    >
                      <span className="font-medium">{drop.name}</span>
                      <span className="px-1.5 py-0.5 rounded bg-black/45 font-rajdhani text-[11px] font-bold">
                        {drop.rate}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {filteredDrops.length === 0 && (
            <div className="text-center py-12 rounded-2xl bg-[#160e0b] border border-orange-500/20 text-[#a89f96] text-sm">
              No monsters or items match your current filter.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 9. MAIN APPLICATION COMPONENT (Default Export)
// ============================================================================

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [rulesOpen, setRulesOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const toastTimerRef = useRef(null);
  const mainContentRef = useRef(null);

  useEffect(() => {
    const mainContent = mainContentRef.current;
    if (!mainContent || !('IntersectionObserver' in window)) return;

    const sections = mainContent.querySelectorAll(
      'section, .scroll-reveal-stack > *'
    );
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('scroll-reveal-visible');
          currentObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -24px 0px' }
    );

    sections.forEach((section) => {
      section.classList.remove('scroll-reveal-visible');
      section.classList.add('scroll-reveal');
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, [activePage]);

  const showToast = (msg) => {
    setToastMessage(msg);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => {
      setToastMessage('');
    }, 3200);
  };

  const navigateTo = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId) => {
    if (activePage !== 'home') {
      setActivePage('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 120);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderPage = () => {
    switch (activePage) {
      case 'download':
        return <DownloadPage onNotify={showToast} />;
      case 'crafting':
        return <CraftingGuidePage />;
      case 'droplist':
        return <DropListPage />;
      case 'home':
      default:
        return (
          <HomePage
            onNavigate={navigateTo}
            onOpenRules={() => setRulesOpen(true)}
            onNotify={showToast}
          />
        );
    }
  };

  return (
    <div className="matrix-background min-h-screen bg-[#080504] text-[#faf6f0] font-inter selection:bg-orange-500/35 selection:text-white flex flex-col">
      {/* Google Fonts & Custom Ember Animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800;900&family=Inter:wght@400;500;600;700&family=Rajdhani:wght@600;700&display=swap');
        .font-cinzel { font-family: 'Cinzel', Georgia, serif; }
        .font-rajdhani { font-family: 'Rajdhani', sans-serif; }
        .font-inter { font-family: 'Inter', system-ui, -apple-system, sans-serif; }
        html { scroll-behavior: smooth; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 0.25s ease-out forwards; }
        .matrix-background {
          background-image:
            repeating-linear-gradient(0deg, transparent 0 23px, rgba(249, 115, 22, 0.055) 24px),
            repeating-linear-gradient(90deg, transparent 0 23px, rgba(249, 115, 22, 0.035) 24px);
        }
        .cyber-card {
          border-color: rgba(249, 115, 22, 0.35);
          border-radius: 0.375rem;
          background:
            linear-gradient(90deg, #fbbf24, #f97316, transparent) top left / 4rem 2px no-repeat,
            repeating-linear-gradient(0deg, transparent 0 23px, rgba(249, 115, 22, 0.045) 24px),
            linear-gradient(135deg, #24140d, #100a07 70%);
          box-shadow: inset 0 0 24px rgba(249, 115, 22, 0.035), 0 8px 24px rgba(0, 0, 0, 0.2);
        }
        .cyber-card:hover,
        .cyber-card-active {
          border-color: rgba(251, 191, 36, 0.7);
          box-shadow: inset 0 0 24px rgba(249, 115, 22, 0.06), 0 0 24px rgba(249, 115, 22, 0.16);
        }
        .scroll-reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 650ms ease, transform 650ms ease;
        }
        .scroll-reveal.scroll-reveal-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .hero-section {
          --header-height: 65px;
          --hero-logo-size: min(480px, 80vw, max(5rem, calc(100svh - 640px)));
          min-height: 100svh;
          padding-top: calc(var(--header-height) + 2.5rem);
          background-image:
            linear-gradient(180deg, rgba(8, 5, 4, 0.38), rgba(8, 5, 4, 0.68)),
            url('/Images/section1-background.webp');
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
        }
        .hero-content {
          flex-grow: 1;
        }
        .hero-embers {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }
        .hero-ember {
          position: absolute;
          bottom: 0;
          width: var(--ember-size);
          height: var(--ember-size);
          border-radius: 50%;
          background: #ffb347;
          box-shadow: 0 0 6px 2px rgba(249, 115, 22, 0.65);
          opacity: 0;
          animation: ember-rise linear infinite;
        }
        @keyframes ember-rise {
          0% { opacity: 0; transform: translate(0, 0); }
          15% { opacity: 0.8; }
          75% { opacity: 0.5; }
          100% { opacity: 0; transform: translate(var(--ember-drift), -100vh); }
        }
        .hero-logo > div,
        .hero-logo img {
          width: var(--hero-logo-size);
          height: var(--hero-logo-size);
        }
        @media (min-width: 640px) {
          .hero-section {
            --header-height: 81px;
            --hero-logo-size: min(768px, 70vw, max(5rem, calc(100svh - 560px)));
            padding-top: calc(var(--header-height) + 4rem);
          }
        }
        @media (max-height: 850px) {
          .hero-section {
            padding-top: calc(var(--header-height) + 2rem);
          }
          .hero-content {
            padding-bottom: 2rem;
          }
          .hero-status-grid > div {
            padding-top: 0.75rem;
            padding-bottom: 0.75rem;
          }
        }
        @media (min-width: 640px) and (max-height: 850px) {
          .hero-section {
            --hero-logo-size: min(768px, 70vw, max(5rem, calc(100svh - 530px)));
          }
          .hero-status-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
        }
        @media (min-width: 1024px) and (max-height: 850px) {
          .hero-section {
            --hero-logo-size: min(768px, 70vw, max(5rem, calc(100svh - 480px)));
          }
        }
        @media (max-height: 700px), (max-width: 639px) and (max-height: 850px) {
          .hero-section {
            padding-top: calc(var(--header-height) + 0.75rem);
          }
          .hero-content {
            padding-bottom: 0.5rem;
          }
          .hero-badge {
            margin-bottom: 0.5rem;
          }
          .hero-logo {
            margin-bottom: 0.5rem;
          }
          .hero-title {
            font-size: clamp(1.125rem, 3.2vh, 1.375rem);
            line-height: 1.15;
          }
          .hero-description {
            margin-top: 0.375rem;
            font-size: 0.75rem;
            line-height: 1.3;
          }
          .hero-actions {
            gap: 0.5rem;
            margin-top: 0.75rem;
          }
          .hero-actions > button,
          .hero-actions > a {
            padding-top: 0.6rem;
            padding-bottom: 0.6rem;
          }
          .hero-status-grid > div {
            padding-top: 0.5rem;
            padding-bottom: 0.5rem;
          }
        }
        @media (max-width: 639px) and (max-height: 850px) {
          .hero-section {
            --hero-logo-size: min(480px, 80vw, max(5rem, calc(100svh - 480px)));
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-embers {
            display: none;
          }
          .scroll-reveal {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
      `}</style>

      {/* Header */}
      <Navbar
        activePage={activePage}
        onNavigate={navigateTo}
        onScrollToSection={scrollToSection}
      />

      {/* Active Page Content */}
      <main
        ref={mainContentRef}
        className={`flex-1 ${activePage === 'home' ? '' : 'pt-[65px] sm:pt-[81px]'}`}
      >
        {renderPage()}
      </main>

      {/* Branded Footer */}
      <FooterSection
        onNavigate={navigateTo}
        onScrollToSection={scrollToSection}
        onOpenRules={() => setRulesOpen(true)}
      />

      {/* Server Rules Modal */}
      <ServerRulesModal open={rulesOpen} onClose={() => setRulesOpen(false)} />

      {/* Toast Notification */}
      <ToastNotification message={toastMessage} />
      <BackgroundMusic />
    </div>
  );
}