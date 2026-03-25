import { useState } from 'react';
import { ArrowLeft, Check, Eye, EyeOff, ChevronDown, Leaf } from 'lucide-react';
import { Link } from 'react-router';
import { useCart } from '../context/CartContext';

// ── Palette & Typography ──────────────────────────────────────────────────────
const C = {
  green:  '#1B7F4A',
  red:    '#E63329',
  yellow: '#F5C800',
  dark:   '#1A1A1A',
  light:  '#F2F0E8',
  white:  '#FFFFFF',
};
const F: Record<string, React.CSSProperties> = {
  black:   { fontFamily: "'Roboto', sans-serif", fontWeight: 900 },
  bold:    { fontFamily: "'Roboto', sans-serif", fontWeight: 700 },
  reg:     { fontFamily: "'Roboto', sans-serif", fontWeight: 400 },
  dancing: { fontFamily: "'Dancing Script', cursive", fontStyle: 'italic' },
};

type Frequency = 'semanal' | 'mensual';

// ── Plan data ────────────────────────────────────────────────────────────────
interface Plan {
  id: string;
  name: string;
  kg: number;
  weeklyPrice: number;
  monthlyPrice: number;
  savings: string;
  desc: string;
  popular: boolean;
  accent: string;
  numColor: string;
}

const PLANS: Plan[] = [
  {
    id: 'brote',
    name: 'PLAN BROTE',
    kg: 5,
    weeklyPrice: 9900,
    monthlyPrice: 34900,
    savings: 'Ahorra $4.700 al mes',
    desc: 'Ideal para 1 o 2 personas',
    popular: false,
    accent: C.green,
    numColor: C.green,
  },
  {
    id: 'cosecha',
    name: 'PLAN COSECHA',
    kg: 10,
    weeklyPrice: 17900,
    monthlyPrice: 62900,
    savings: 'Ahorra $8.700 al mes',
    desc: 'Para familias pequeñas',
    popular: true,
    accent: C.yellow,
    numColor: C.yellow,
  },
  {
    id: 'abundancia',
    name: 'PLAN ABUNDANCIA',
    kg: 15,
    weeklyPrice: 24900,
    monthlyPrice: 87900,
    savings: 'Ahorra $11.700 al mes',
    desc: 'Para los que aman comer bien en serio',
    popular: false,
    accent: C.red,
    numColor: C.red,
  },
];

const DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

const formatCLP = (n: number) => `$${n.toLocaleString('es-CL')}`;

// ── SCREEN 1 — Plan Selector ─────────────────────────────────────────────────

function FrequencyToggle({ freq, onChange }: { freq: Frequency; onChange: (f: Frequency) => void }) {
  return (
    <div style={{
      display: 'flex',
      backgroundColor: C.dark,
      padding: '4px',
      gap: '4px',
    }}>
      {(['semanal', 'mensual'] as Frequency[]).map(f => (
        <button
          key={f}
          onClick={() => onChange(f)}
          style={{
            flex: 1,
            padding: '12px 0',
            backgroundColor: freq === f ? C.yellow : 'transparent',
            color: freq === f ? C.dark : 'rgba(242,240,232,0.6)',
            border: 'none',
            cursor: 'pointer',
            ...F.black,
            fontSize: '12px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            transition: 'all 0.2s',
            position: 'relative',
          }}
        >
          {f === 'mensual' ? (
            <>
              {f.toUpperCase()}
              <span style={{
                position: 'absolute',
                top: '4px',
                right: '10px',
                backgroundColor: C.green,
                color: C.white,
                ...F.bold,
                fontSize: '7px',
                letterSpacing: '0.08em',
                padding: '1px 5px',
                textTransform: 'uppercase',
              }}>
                −10%
              </span>
            </>
          ) : f.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

function PlanCard({ plan, freq, onSelect }: { plan: Plan; freq: Frequency; onSelect: (p: Plan) => void }) {
  const price = freq === 'semanal' ? plan.weeklyPrice : plan.monthlyPrice;
  const periodLabel = freq === 'semanal' ? '/semana' : '/mes';

  if (plan.popular) {
    // Featured dark card
    return (
      <div style={{ position: 'relative', marginBottom: '0' }}>
        {/* MÁS POPULAR ribbon */}
        <div style={{
          backgroundColor: C.yellow,
          padding: '7px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <Leaf size={12} color={C.dark} strokeWidth={2.5} />
          <span style={{ ...F.black, fontSize: '10px', color: C.dark, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Más Popular
          </span>
        </div>

        <div style={{
          backgroundColor: C.dark,
          borderLeft: `7px solid ${C.yellow}`,
          padding: '24px 20px 24px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Ghost KG background */}
          <div style={{
            position: 'absolute', right: '-8px', top: '-20px',
            ...F.black, fontSize: '140px', color: C.yellow,
            opacity: 0.07, lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
          }}>
            {plan.kg}
          </div>

          {/* Small decorative rect */}
          <div style={{ position: 'absolute', top: 0, right: '40px', width: '4px', height: '100%', backgroundColor: C.yellow, opacity: 0.12 }} />

          {/* Plan name */}
          <div style={{ ...F.black, fontSize: '11px', color: 'rgba(242,240,232,0.5)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '6px' }}>
            {plan.name}
          </div>

          {/* KG display */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '4px' }}>
            <span style={{ ...F.black, fontSize: '64px', color: C.yellow, lineHeight: 1 }}>{plan.kg}</span>
            <span style={{ ...F.bold, fontSize: '20px', color: 'rgba(242,240,232,0.7)' }}>kg</span>
          </div>

          <p style={{ ...F.reg, fontSize: '13px', color: 'rgba(242,240,232,0.55)', marginBottom: '16px' }}>
            {plan.desc}
          </p>

          {/* Price */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '10px' }}>
            <span style={{ ...F.black, fontSize: '32px', color: C.yellow, lineHeight: 1 }}>
              {formatCLP(price)}
            </span>
            <span style={{ ...F.reg, fontSize: '13px', color: 'rgba(242,240,232,0.5)' }}>
              {periodLabel}
            </span>
          </div>

          {/* Savings tag */}
          <div style={{
            display: 'inline-block',
            backgroundColor: C.green,
            padding: '4px 10px',
            marginBottom: '20px',
          }}>
            <span style={{ ...F.bold, fontSize: '10px', color: C.white, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {plan.savings}
            </span>
          </div>

          {/* CTA */}
          <button
            onClick={() => onSelect(plan)}
            style={{
              width: '100%',
              backgroundColor: C.yellow,
              color: C.dark,
              border: 'none',
              cursor: 'pointer',
              padding: '16px',
              ...F.black,
              fontSize: '13px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            Elegir este plan →
          </button>
        </div>
      </div>
    );
  }

  // Regular card
  return (
    <div style={{
      backgroundColor: C.white,
      borderLeft: `7px solid ${plan.accent}`,
      padding: '20px 20px 20px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Ghost KG */}
      <div style={{
        position: 'absolute', right: '-8px', top: '-16px',
        ...F.black, fontSize: '110px', color: plan.accent,
        opacity: 0.06, lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
      }}>
        {plan.kg}
      </div>

      <div style={{ ...F.black, fontSize: '10px', color: 'rgba(26,26,26,0.4)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '4px' }}>
        {plan.name}
      </div>

      {/* KG display */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px', marginBottom: '2px' }}>
        <span style={{ ...F.black, fontSize: '52px', color: plan.accent, lineHeight: 1 }}>{plan.kg}</span>
        <span style={{ ...F.bold, fontSize: '18px', color: 'rgba(26,26,26,0.45)' }}>kg</span>
      </div>

      <p style={{ ...F.reg, fontSize: '13px', color: 'rgba(26,26,26,0.5)', marginBottom: '12px' }}>
        {plan.desc}
      </p>

      {/* Price */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '8px' }}>
        <span style={{ ...F.black, fontSize: '28px', color: C.dark, lineHeight: 1 }}>
          {formatCLP(price)}
        </span>
        <span style={{ ...F.reg, fontSize: '12px', color: 'rgba(26,26,26,0.45)' }}>
          {periodLabel}
        </span>
      </div>

      {/* Savings tag */}
      <div style={{
        display: 'inline-block',
        backgroundColor: plan.accent === C.red ? C.red : C.green,
        padding: '3px 9px',
        marginBottom: '16px',
      }}>
        <span style={{ ...F.bold, fontSize: '9px', color: C.white, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          {plan.savings}
        </span>
      </div>

      {/* CTA */}
      <button
        onClick={() => onSelect(plan)}
        style={{
          width: '100%',
          backgroundColor: 'transparent',
          color: plan.accent,
          border: `2.5px solid ${plan.accent}`,
          cursor: 'pointer',
          padding: '13px',
          ...F.bold,
          fontSize: '12px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          transition: 'all 0.15s',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = plan.accent;
          (e.currentTarget as HTMLButtonElement).style.color = plan.accent === C.yellow ? C.dark : C.white;
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
          (e.currentTarget as HTMLButtonElement).style.color = plan.accent;
        }}
      >
        Elegir este plan
      </button>
    </div>
  );
}

function PlanSelectorScreen({ onSelect }: { onSelect: (plan: Plan) => void }) {
  const [freq, setFreq] = useState<Frequency>('semanal');

  return (
    <div style={{ backgroundColor: C.light, minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ backgroundColor: C.green, padding: '36px 24px 0', position: 'relative', overflow: 'hidden' }}>
        {/* Bauhaus geometric decorations */}
        <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '160px', height: '160px', backgroundColor: C.yellow, opacity: 0.15 }} />
        <div style={{ position: 'absolute', bottom: '20px', right: '24px', width: '48px', height: '48px', borderRadius: '50%', backgroundColor: C.red, opacity: 0.3 }} />
        <div style={{ position: 'absolute', top: '0', left: '60px', width: '6px', height: '100%', backgroundColor: C.dark, opacity: 0.12 }} />

        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none', marginBottom: '20px', position: 'relative', zIndex: 1 }}>
          <ArrowLeft size={15} color="rgba(242,240,232,0.7)" strokeWidth={2.5} />
          <span style={{ ...F.bold, fontSize: '10px', color: 'rgba(242,240,232,0.6)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Volver</span>
        </Link>

        <h1 style={{
          ...F.black, fontSize: '38px', color: C.light,
          textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1.0,
          marginBottom: '10px', position: 'relative', zIndex: 1,
        }}>
          ELIGE<br />TU PLAN
        </h1>
        <p style={{ ...F.dancing, fontSize: '20px', color: C.yellow, marginBottom: '28px', position: 'relative', zIndex: 1 }}>
          Sin permanencia. Cancela cuando quieras.
        </p>

        {/* Bauhaus color bar */}
        <div style={{ height: '6px', display: 'flex', position: 'relative', zIndex: 1 }}>
          <div style={{ flex: 1, backgroundColor: C.yellow }} />
          <div style={{ flex: 1, backgroundColor: C.red }} />
          <div style={{ flex: 1, backgroundColor: C.dark }} />
          <div style={{ flex: 1, backgroundColor: C.light, opacity: 0.4 }} />
        </div>
      </div>

      {/* Frequency toggle */}
      <div style={{ padding: '20px 20px 0' }}>
        <p style={{ ...F.bold, fontSize: '10px', color: 'rgba(26,26,26,0.45)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '8px' }}>
          Frecuencia de entrega
        </p>
        <FrequencyToggle freq={freq} onChange={setFreq} />
      </div>

      {/* Plans */}
      <div style={{ padding: '16px 20px 32px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {PLANS.map(plan => (
          <PlanCard key={plan.id} plan={plan} freq={freq} onSelect={onSelect} />
        ))}
      </div>

      {/* Trust strip */}
      <div style={{ backgroundColor: C.dark, padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '4px', height: '32px', backgroundColor: C.yellow, flexShrink: 0 }} />
        <p style={{ ...F.reg, fontSize: '12px', color: 'rgba(242,240,232,0.55)', lineHeight: 1.5 }}>
          Todos los planes incluyen despacho gratis. Puedes pausar o cancelar en cualquier momento.
        </p>
      </div>
    </div>
  );
}

// ── SCREEN 2 — Subscription Form ─────────────────────────────────────────────

interface FormValues {
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  comuna: string;
  diaEntrega: string;
  contrasena: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

function FormField({
  label,
  children,
  error,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div style={{ marginBottom: '16px' }}>
      <label style={{
        display: 'block',
        ...F.bold,
        fontSize: '10px',
        color: error ? C.red : 'rgba(26,26,26,0.55)',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        marginBottom: '6px',
      }}>
        {label}
      </label>
      {children}
      {error && (
        <p style={{ ...F.reg, fontSize: '11px', color: C.red, marginTop: '4px' }}>
          {error}
        </p>
      )}
    </div>
  );
}

const inputStyle = (hasError: boolean): React.CSSProperties => ({
  width: '100%',
  padding: '14px 16px',
  backgroundColor: C.white,
  border: `2px solid ${hasError ? C.red : C.dark}`,
  borderRadius: 0,
  outline: 'none',
  ...F.reg,
  fontSize: '15px',
  color: C.dark,
  boxSizing: 'border-box',
  appearance: 'none',
});

function FormScreen({
  plan,
  onBack,
  onSubmit,
}: {
  plan: Plan;
  onBack: () => void;
  onSubmit: (name: string) => void;
}) {
  const [values, setValues] = useState<FormValues>({
    nombre: '', email: '', telefono: '',
    direccion: '', comuna: '', diaEntrega: '',
    contrasena: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);

  const set = (field: keyof FormValues) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setValues(v => ({ ...v, [field]: e.target.value }));
    if (errors[field]) setErrors(er => ({ ...er, [field]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!values.nombre.trim()) newErrors.nombre = 'Ingresa tu nombre completo';
    if (!values.email.trim() || !/\S+@\S+\.\S+/.test(values.email)) newErrors.email = 'Ingresa un email válido';
    if (!values.telefono.trim()) newErrors.telefono = 'Ingresa tu teléfono';
    if (!values.direccion.trim()) newErrors.direccion = 'Ingresa tu dirección';
    if (!values.comuna.trim()) newErrors.comuna = 'Ingresa tu comuna';
    if (!values.diaEntrega) newErrors.diaEntrega = 'Elige un día de entrega';
    if (values.contrasena.length < 6) newErrors.contrasena = 'Mínimo 6 caracteres';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) onSubmit(values.nombre.trim().split(' ')[0]);
  };

  return (
    <div style={{ backgroundColor: C.light, minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ backgroundColor: C.red, padding: '36px 24px 28px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '110px', height: '110px', borderRadius: '50%', backgroundColor: C.dark, opacity: 0.2 }} />
        <div style={{ position: 'absolute', bottom: '0', left: '0', width: '100%', height: '5px', backgroundColor: C.yellow }} />
        <div style={{ position: 'absolute', top: '20px', left: '90px', width: '4px', height: '80%', backgroundColor: C.dark, opacity: 0.12 }} />

        <button
          onClick={onBack}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: '18px' }}
        >
          <ArrowLeft size={15} color="rgba(242,240,232,0.7)" strokeWidth={2.5} />
          <span style={{ ...F.bold, fontSize: '10px', color: 'rgba(242,240,232,0.65)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Volver</span>
        </button>

        {/* Selected plan badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(0,0,0,0.2)', padding: '6px 12px', marginBottom: '14px' }}>
          <div style={{ width: '8px', height: '8px', backgroundColor: plan.accent }} />
          <span style={{ ...F.bold, fontSize: '10px', color: C.light, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            {plan.name} · {plan.kg} kg
          </span>
        </div>

        <h1 style={{ ...F.black, fontSize: '36px', color: C.light, textTransform: 'uppercase', lineHeight: 1.0, letterSpacing: '-0.02em', marginBottom: '8px' }}>
          CASI<br />LISTO
        </h1>
        <p style={{ ...F.dancing, fontSize: '20px', color: C.yellow }}>
          Cuéntanos dónde llevarte la caja.
        </p>
      </div>

      {/* Form */}
      <div style={{ padding: '28px 20px 0' }}>

        <FormField label="Nombre completo" error={errors.nombre}>
          <input
            type="text"
            placeholder="María González"
            value={values.nombre}
            onChange={set('nombre')}
            style={inputStyle(!!errors.nombre)}
          />
        </FormField>

        <FormField label="Email" error={errors.email}>
          <input
            type="email"
            placeholder="maria@email.com"
            value={values.email}
            onChange={set('email')}
            style={inputStyle(!!errors.email)}
          />
        </FormField>

        <FormField label="Teléfono" error={errors.telefono}>
          <input
            type="tel"
            placeholder="+56 9 1234 5678"
            value={values.telefono}
            onChange={set('telefono')}
            style={inputStyle(!!errors.telefono)}
          />
        </FormField>

        {/* Divider label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', marginTop: '4px' }}>
          <div style={{ flex: 1, height: '2px', backgroundColor: C.dark }} />
          <span style={{ ...F.bold, fontSize: '9px', color: 'rgba(26,26,26,0.4)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Entrega
          </span>
          <div style={{ flex: 1, height: '2px', backgroundColor: C.dark }} />
        </div>

        <FormField label="Dirección de entrega" error={errors.direccion}>
          <input
            type="text"
            placeholder="Av. Providencia 1234, Dpto 5B"
            value={values.direccion}
            onChange={set('direccion')}
            style={inputStyle(!!errors.direccion)}
          />
        </FormField>

        <FormField label="Comuna" error={errors.comuna}>
          <input
            type="text"
            placeholder="Providencia"
            value={values.comuna}
            onChange={set('comuna')}
            style={inputStyle(!!errors.comuna)}
          />
        </FormField>

        <FormField label="Día de entrega preferido" error={errors.diaEntrega}>
          <div style={{ position: 'relative' }}>
            <select
              value={values.diaEntrega}
              onChange={set('diaEntrega')}
              style={{
                ...inputStyle(!!errors.diaEntrega),
                paddingRight: '44px',
                cursor: 'pointer',
                backgroundColor: values.diaEntrega ? C.white : C.white,
                color: values.diaEntrega ? C.dark : 'rgba(26,26,26,0.35)',
              }}
            >
              <option value="" disabled>Selecciona un día</option>
              {DAYS.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <div style={{
              position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
              pointerEvents: 'none',
            }}>
              <ChevronDown size={18} color={C.dark} strokeWidth={2} />
            </div>
          </div>
        </FormField>

        {/* Account divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', marginTop: '4px' }}>
          <div style={{ flex: 1, height: '2px', backgroundColor: C.dark }} />
          <span style={{ ...F.bold, fontSize: '9px', color: 'rgba(26,26,26,0.4)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Tu cuenta
          </span>
          <div style={{ flex: 1, height: '2px', backgroundColor: C.dark }} />
        </div>

        <FormField label="Contraseña" error={errors.contrasena}>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Mínimo 6 caracteres"
              value={values.contrasena}
              onChange={set('contrasena')}
              style={{ ...inputStyle(!!errors.contrasena), paddingRight: '50px' }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(v => !v)}
              style={{
                position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer', padding: '2px',
                color: 'rgba(26,26,26,0.45)',
              }}
            >
              {showPassword ? <EyeOff size={18} strokeWidth={2} /> : <Eye size={18} strokeWidth={2} />}
            </button>
          </div>
        </FormField>
      </div>

      {/* CTA */}
      <div style={{ padding: '24px 20px 32px' }}>
        <button
          onClick={handleSubmit}
          style={{
            width: '100%',
            backgroundColor: C.green,
            color: C.white,
            border: 'none',
            cursor: 'pointer',
            padding: '20px',
            ...F.black,
            fontSize: '14px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Bauhaus inner decoration */}
          <span style={{ position: 'absolute', left: 0, top: 0, width: '5px', height: '100%', backgroundColor: C.yellow, opacity: 0.6 }} />
          Confirmar suscripción
        </button>

        <p style={{
          ...F.reg,
          fontSize: '11px',
          color: 'rgba(26,26,26,0.4)',
          textAlign: 'center',
          marginTop: '12px',
          lineHeight: 1.5,
        }}>
          Puedes cancelar cuando quieras. Sin cargos ocultos.
        </p>
      </div>
    </div>
  );
}

// ── SCREEN 3 — Confirmation ───────────────────────────────────────────────────

function ConfirmationScreen({ nombre, plan }: { nombre: string; plan: Plan }) {
  return (
    <div style={{
      backgroundColor: C.green,
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Bauhaus geometric background decorations */}
      <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '220px', height: '220px', backgroundColor: C.yellow, opacity: 0.12 }} />
      <div style={{ position: 'absolute', bottom: '100px', left: '-40px', width: '140px', height: '140px', borderRadius: '50%', backgroundColor: C.red, opacity: 0.15 }} />
      <div style={{ position: 'absolute', top: '40%', right: '-20px', width: '60px', height: '200px', backgroundColor: C.dark, opacity: 0.1, transform: 'rotate(15deg)' }} />
      <div style={{ position: 'absolute', top: '30px', left: '30px', width: '30px', height: '30px', backgroundColor: C.red, opacity: 0.4 }} />

      {/* Top color bar */}
      <div style={{ height: '6px', display: 'flex', flexShrink: 0 }}>
        <div style={{ flex: 1, backgroundColor: C.yellow }} />
        <div style={{ flex: 1, backgroundColor: C.red }} />
        <div style={{ flex: 1, backgroundColor: C.dark }} />
        <div style={{ flex: 1, backgroundColor: C.light }} />
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 28px', position: 'relative', zIndex: 1 }}>

        {/* Yellow geometric circle with checkmark */}
        <div style={{ position: 'relative', marginBottom: '36px' }}>
          {/* Outer dark ring */}
          <div style={{
            width: '128px', height: '128px',
            borderRadius: '50%',
            border: `5px solid ${C.dark}`,
            backgroundColor: C.yellow,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Check size={54} color={C.dark} strokeWidth={3.5} />
          </div>

          {/* Decorative squares around circle */}
          <div style={{ position: 'absolute', top: '-8px', right: '-8px', width: '22px', height: '22px', backgroundColor: C.red }} />
          <div style={{ position: 'absolute', bottom: '-8px', left: '-8px', width: '22px', height: '22px', backgroundColor: C.dark }} />
        </div>

        {/* Title */}
        <h1 style={{
          ...F.black, fontSize: '44px', color: C.light,
          textTransform: 'uppercase', letterSpacing: '-0.02em',
          lineHeight: 1.0, textAlign: 'center', marginBottom: '6px',
        }}>
          ¡LISTO,
        </h1>
        <h1 style={{
          ...F.black, fontSize: '44px', color: C.yellow,
          textTransform: 'uppercase', letterSpacing: '-0.02em',
          lineHeight: 1.0, textAlign: 'center', marginBottom: '28px',
        }}>
          {nombre.toUpperCase()}!
        </h1>

        {/* Message */}
        <p style={{
          ...F.reg, fontSize: '16px', color: 'rgba(242,240,232,0.85)',
          textAlign: 'center', lineHeight: 1.7, marginBottom: '32px',
          maxWidth: '280px',
        }}>
          Tu primera caja está en camino.{' '}
          <span style={{ ...F.dancing, fontSize: '19px', color: C.yellow }}>
            Te avisamos cuando salga.
          </span>
        </p>

        {/* Plan summary pill */}
        <div style={{
          backgroundColor: 'rgba(0,0,0,0.25)',
          padding: '12px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '36px',
          width: '100%',
          maxWidth: '300px',
        }}>
          <div style={{ width: '12px', height: '36px', backgroundColor: plan.accent, flexShrink: 0 }} />
          <div>
            <div style={{ ...F.bold, fontSize: '10px', color: 'rgba(242,240,232,0.5)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              Tu plan
            </div>
            <div style={{ ...F.black, fontSize: '16px', color: C.light, textTransform: 'uppercase', lineHeight: 1.2 }}>
              {plan.name} · {plan.kg} KG
            </div>
          </div>
        </div>

        {/* CTA — outlined */}
        <Link
          to="/mi-caja"
          style={{
            display: 'block',
            width: '100%',
            maxWidth: '300px',
            padding: '18px',
            backgroundColor: 'transparent',
            border: `2.5px solid ${C.light}`,
            color: C.light,
            textDecoration: 'none',
            textAlign: 'center',
            ...F.bold,
            fontSize: '13px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
          }}
        >
          Ver mi pedido
        </Link>
      </div>

      {/* Bottom color bar */}
      <div style={{ height: '6px', display: 'flex', flexShrink: 0 }}>
        <div style={{ flex: 1, backgroundColor: C.light }} />
        <div style={{ flex: 1, backgroundColor: C.dark }} />
        <div style={{ flex: 1, backgroundColor: C.red }} />
        <div style={{ flex: 1, backgroundColor: C.yellow }} />
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export function SubscribePage() {
  const { setPlan } = useCart();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedPlan, setSelectedPlan] = useState<Plan>(PLANS[1]);
  const [confirmedName, setConfirmedName] = useState('');

  if (step === 1) {
    return (
      <PlanSelectorScreen
        onSelect={(plan) => {
          setSelectedPlan(plan);
          setStep(2);
        }}
      />
    );
  }

  if (step === 2) {
    return (
      <FormScreen
        plan={selectedPlan}
        onBack={() => setStep(1)}
        onSubmit={(name) => {
          setConfirmedName(name);
          setPlan(selectedPlan.name, selectedPlan.kg);
          setStep(3);
        }}
      />
    );
  }

  return <ConfirmationScreen nombre={confirmedName} plan={selectedPlan} />;
}