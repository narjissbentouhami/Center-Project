import { AbilityBuilder, Ability } from '@casl/ability'

export type Subjects = string
export type Actions =
  | 'manage'
  | 'maintenance'
  | 'kpisEnergy'
  | 'ged'
  | 'gtc'
  | 'interfaceMaintenance'
  | 'spaceManagement'
  | 'appMobile'

export type AppAbility = Ability<[Actions, Subjects]> | undefined

type Roles =
  | 'Super_Administrateur'
  | 'Administrateur'
  | 'Responsable_maintenance'
  | 'Technicien'
  | 'Responsable_client'
  | 'Utilisateur_final'

export const AppAbility = Ability as any
export type ACLObj = {
  action: Actions
  subject: string
}

type Permission = {
  subject: string
  [key: string]: string[] | string
}

export const permissions: Permission[] = [
  {
    subject: 'interface',
    Administrateur: ['maintenance', 'kpisEnergy', 'gtc', 'spaceManagement'],
    Responsable_maintenance: ['maintenance', 'gtc', 'interfaceMaintenance'],
    Technicien: ['interfaceMaintenance'],
    Responsable_client: ['spaceManagement', 'appMobile'],
    Utilisateur_final: ['appMobile']
  }
]

/**
 * Please define your own Ability rules according to your app requirements.
 * We have just shown Admin and Client rules for demo purpose where
 * admin can manage everything and client can just visit ACL page
 */
const defineRulesFor = (role: string, subject: string) => {
  const { can, rules } = new AbilityBuilder(AppAbility)
  console.log('role', role)

  if (role === 'Super_Administrateur') {
    can('manage', 'all')
  } else if (role === 'Administrateur') {
    can('manage', 'all')
  } else if (role === 'Technicien') {
    can('manage', 'all')
  } else if (role === 'Responsable_maintenance') {
    can('manage', 'all')
  } else {
    permissions.forEach(rule => {
      if (rule[role]) {
        can(rule[role], rule.subject)
      }
    })
  }

  return rules
}

export const buildAbilityFor = (role: string, subject: string): AppAbility => {
  return new AppAbility(defineRulesFor(role, subject), {
    // https://casl.js.org/v5/en/guide/subject-type-detection
    // @ts-ignore
    detectSubjectType: object => object!.type
  })
}

export const defaultACLObj: ACLObj = {
  action: 'manage',
  subject: 'all'
}

export default defineRulesFor
