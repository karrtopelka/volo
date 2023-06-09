export type User = {
  id: number
  email: string
  name: string | null
  avatar: string | null
  role: UserRole
  locationId: number | null
  location: Location | null
  phoneNumber: string | null
  reputation: number
  lastLogin: string | null
  requests: Requests
  contributions: Contributions
  comments: Comments
  interests: Interests
  writtenReviews: Reviews
  receivedReviews: Reviews
  views: RequestViews
  notifications: Notifications
  messages: Messages
  chats: Chats

  createdAt: string
  updatedAt: string
}

export type Users = User[]

export type UserPost = Pick<
  User,
  'email' | 'avatar' | 'name' | 'role' | 'phoneNumber'
>

export type Location = {
  id: number
  longitude: number
  latitude: number
}

export type Category = {
  id: number
  nameUk: string
  nameEn: string
  descriptionUk: string
  descriptionEn: string
}

export type Categories = Category[]

export type Request = {
  id: number
  title: string
  description: string
  categoryId: number
  category: Category
  type: RequestType
  status: RequestStatus
  userId: number
  user: User
  viewsCount: number
  contributionsCount: number
  totalCollected: number | null
  monobankBucketLink: string | null
  goalAmount: number | null
  contributions: Contributions
  comments: Comments
  attachments: Attachments
  tags: Tags
  milestones: Milestones
  views: RequestViews
  messages: Messages

  createdAt: string
  updatedAt: string
}

export type Requests = Request[]

export type RequestPostGeneralInformation = Pick<
  Request,
  'title' | 'description' | 'goalAmount' | 'totalCollected'
>

export type RequestPostCategory = Pick<
  Request,
  'categoryId' | 'type' | 'status'
>

export type RequestPostCategoryStep = RequestPostGeneralInformation &
  RequestPostCategory

export type RequestPostAdditionalInformation = Pick<
  Request,
  'monobankBucketLink'
> & {
  tags: number[]
}

export type RequestPostAdditionalInformationStep =
  RequestPostAdditionalInformation & RequestPostCategoryStep

export type RequestPostPhotos = {
  attachments: string[]
}

export type RequestPostPhotosStep = RequestPostPhotos &
  RequestPostAdditionalInformationStep

export type RequestPost = Partial<
  Pick<
    Request,
    | 'title'
    | 'description'
    | 'categoryId'
    | 'type'
    | 'status'
    | 'goalAmount'
    | 'totalCollected'
    | 'monobankBucketLink'
  > & { tags: number[]; attachments: string[] }
>

export type Attachment = {
  id: number
  fileUrl: string
  requestId: number
  request: Request
}

export type Attachments = Attachment[]

export type Contribution = {
  id: number
}

export type Contributions = Contribution[]

export type Interest = {
  id: number
  nameUk: string
  nameEn: string
}

export type Interests = Interest[]

export type Tag = {
  id: number
  nameUk: string
  nameEn: string
}

export type Tags = Tag[]

export type Comment = {
  id: number
  content: string
  authorId: number
  author: User
  requestId: number
  request: Request

  createdAt: string
  updatedAt: string
}

export type CommentPost = Pick<Comment, 'content'>

export type Comments = Comment[]

export type Review = {
  id: number
  rating: number
  content: string | null
  reviewerId: number
  reviewedId: number
  reviewer: User

  createdAt: string
  updatedAt: string
}

export type Reviews = Review[]

export type Milestone = {
  id: number
  title: string
  description: string
  status: MilestoneStatus
  requestId: number
  request: Request
  dueDate: string

  createdAt: string
  updatedAt: string
}

export type Milestones = Milestone[]

export type RequestView = {
  id: number
  requestId: number
  request: Request
  userId: number
  user: User
}

export type RequestViews = RequestView[]

export type Notification = {
  id: number
  content: string
  type: NotificationType
  recipientId: number
  recipient: User
}

export type Notifications = Notification[]

export type Chat = {
  id: number
  users: [
    Pick<
      User,
      | 'id'
      | 'email'
      | 'name'
      | 'avatar'
      | 'role'
      | 'phoneNumber'
      | 'reputation'
      | 'createdAt'
      | 'updatedAt'
    >
  ]
  messages: Messages

  createdAt: string
  updatedAt: string
}

export type Chats = Chat[]

export type ChatPost = {
  message: string
  recipientId: number
}

export type Message = {
  id: number
  content: string
  senderId: number
  sender: Pick<
    User,
    | 'id'
    | 'email'
    | 'name'
    | 'avatar'
    | 'role'
    | 'phoneNumber'
    | 'reputation'
    | 'createdAt'
    | 'updatedAt'
  >
  chatId: number
  chat: Chat

  createdAt: string
}

export type Messages = Message[]

export enum UserRole {
  ADMIN = 'ADMIN',
  VOLUNTEER = 'VOLUNTEER',
  DONOR = 'DONOR',
  MILITARY = 'MILITARY',
  REFUGEE = 'REFUGEE',
}

export enum NotificationType {
  NEW_REQUEST = 'NEW_REQUEST',
  CONTRIBUTION_RECEIVED = 'CONTRIBUTION_RECEIVED',
  REQUEST_UPDATE = 'REQUEST_UPDATE',
  COMMENT = 'COMMENT',
}

export enum RequestStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CLOSED = 'CLOSED',
}

export enum RequestType {
  FINANCIAL = 'FINANCIAL',
  COLLECTION = 'COLLECTION',
  MATERIAL = 'MATERIAL',
  THINGS = 'THINGS',
}

export enum MilestoneStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}
