export interface CTAProps {
  onCTAClick: () => void
}

export interface AuthModalProps {
  open:    boolean
  onClose: () => void
}

export interface NavbarProps {
  onCTAClick: () => void
}

export interface SectionHeadingProps {
  eyebrow:    string
  heading:    string
  sub?:       string
  centered?:  boolean
  className?: string
}
