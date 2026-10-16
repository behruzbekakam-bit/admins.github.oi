import React, { useState } from 'react';
import {
  Lock,
  Unlock,
  KeyRound,
  ShieldCheck,
  AlertCircle,
  X,
  CheckCircle,
  Trash2,
  Download
} from 'lucide-react';

interface AdminSecurityModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAdminUnlocked: boolean;
  setIsAdminUnlocked: (val: boolean) => void;
}

export const AdminSecurityModal: React.FC<AdminSecurityModalProps> = ({
  isOpen,
  onClose,
  isAdminUnlocked,
  setIsAdminUnlocked,
}) => {
  const [pinInput, setPinInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Change PIN states
  const [isChangingPin, setIsChangingPin] = useState(false);
  const [oldPin, setOldPin] = useState('');
  const [newPin, setNewPin] = useState('');

  if (!isOpen) return null;

  const handleVerifyPin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const res = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: pinInput }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsAdminUnlocked(true);
        setPinInput('');
        setSuccessMsg("Xavfsizlik qulfi ochildi! Siz boshqaruvchilik huquqiga egasiz.");
        setTimeout(() => setSuccessMsg(''), 3000);
      } else {
        setErrorMsg(data.message || "Noto'g'ri PIN kod!");
      }
    } catch (err: any) {
      // Local fallback: default 7777
      if (pinInput === '7777') {
        setIsAdminUnlocked(true);
        setPinInput('');
        setSuccessMsg("Xavfsizlik qulfi ochildi!");
      } else {
        setErrorMsg("Noto'g'ri xavfsizlik PIN kodi!");
      }
    }
  };

  const handleChangePin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (newPin.length < 4) {
      setErrorMsg("Yangi PIN kod kamida 4 xonali bo'lishi kerak");
      return;
    }

    try {
      const res = await fetch('/api/admin/change-pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ oldPin, newPin }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMsg("PIN kod muvaffaqiyatli o'zgartirildi!");
        setIsChangingPin(false);
        setOldPin('');
        setNewPin('');
      } else {
        setErrorMsg(data.message || "Eski PIN noto'g'ri!");
      }
    } catch (err: any) {
      setErrorMsg("PIN o'zgartirishda xatolik");
    }
  };

  const handleLockAgain = () => {
    setIsAdminUnlocked(false);
    onClose();
  };

  const handleClearAllStorage = () => {
    if (confirm("Barcha saqlangan maxsus hujjatlar va suhbatlar tozalansinmi?")) {
      localStorage.clear();
      alert("Xotira tozalandi. Ilova qayta yuklanadi.");
      window.location.reload();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className={`p-3 rounded-2xl ${isAdminUnlocked ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'}`}>
            {isAdminUnlocked ? <Unlock className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
          </div>
          <div>
            <h3 className="font-extrabold text-white text-base">
              {isAdminUnlocked ? "Ilova Egasi Boshqaruvi (Ochiq)" : "Xavfsizlik & Egasi Qulfi"}
            </h3>
            <p className="text-xs text-slate-400">
              Hech kim sizdan beruxsat sozlamalarni o'zgartira olmaydi
            </p>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {!isAdminUnlocked ? (
          // Unlock Form
          <form onSubmit={handleVerifyPin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Egasi Xavfsizlik PIN kodi (Odatiy: 7777)
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="PIN kodni kiriting..."
                  maxLength={10}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-center text-lg tracking-widest text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                  autoFocus
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-500/20 transition-all"
            >
              Qulfni Ochish
            </button>
          </form>
        ) : (
          // Unlocked Admin Panel
          <div className="space-y-4">
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Siz hozirda to'liq boshqaruv huquqiga egasiz.</span>
            </div>

            {!isChangingPin ? (
              <div className="space-y-2">
                <button
                  onClick={() => setIsChangingPin(true)}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center justify-between transition-colors"
                >
                  <span>🔐 Xavfsizlik PIN kodini o'zgartirish</span>
                  <span className="text-amber-400">&rarr;</span>
                </button>

                <button
                  onClick={handleClearAllStorage}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-rose-950/40 text-slate-300 hover:text-rose-300 text-xs font-semibold border border-slate-700 hover:border-rose-500/40 flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    <Trash2 className="w-3.5 h-3.5" /> Barcha maxsus ma'lumotlarni tozalash
                  </span>
                </button>

                <button
                  onClick={handleLockAgain}
                  className="w-full mt-3 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <Lock className="w-4 h-4" />
                  <span>Qayta Qulflash</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleChangePin} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Eski PIN kod</label>
                  <input
                    type="password"
                    value={oldPin}
                    onChange={(e) => setOldPin(e.target.value)}
                    placeholder="Eski kod"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Yangi PIN kod (kamida 4 ta belgi)</label>
                  <input
                    type="password"
                    value={newPin}
                    onChange={(e) => setNewPin(e.target.value)}
                    placeholder="Yangi kod"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsChangingPin(false)}
                    className="flex-1 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                  >
                    Bekor qilish
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs"
                  >
                    Saqlash
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
